import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { PHOTOS } from '../../data/content'
import BackToFolders from './BackToFolders'
import { startFrames, stopFrames, type FrameFn } from './frameLoop'
import { releaseImages, SIZES, workImage } from './imageSources'
import './photo.css'

const COLS = 4
const ROWS = 4
const CELL_W = 300
const CELL_H = 200
const GAP = 46
const SX = CELL_W + GAP
const SY = CELL_H + GAP
const TW = COLS * SX
const TH = ROWS * SY
/** 每列的错落偏移，让网格不像表格 */
const COL_SHIFT = [0, 96, 34, 132]
const MAX_SHIFT = 132
/** 透视 + rotateY(-7deg) 后，靠左侧的格子会被缩小，按最坏比例放大取样范围 */
const PERSP = 1.12
/** 视口外再多留的一圈余量 */
const MARGIN_X = CELL_W * 0.8
const MARGIN_Y = CELL_H * 0.8
/** 惯性停止阈值（像素/帧） */
const STOP_V = 0.12
/** 位移绝对值超过这个量级就归一化一次，避免 transform 掉进浮点误差区 */
const RENORM = 5e5

const mod = (v: number, m: number) => ((v % m) + m) % m

type Cell = { key: string; x: number; y: number; src: string }
type Win = { gx0: number; gx1: number; gy0: number; gy1: number }

/** 算出可见窗口内的格子；世界坐标按无限网格推导，内容按 4×4 取模复用 */
function buildCells(w: Win): Cell[] {
  const out: Cell[] = []
  for (let gy = w.gy0; gy <= w.gy1; gy++) {
    for (let gx = w.gx0; gx <= w.gx1; gx++) {
      const c = mod(gx, COLS)
      const r = mod(gy, ROWS)
      out.push({
        key: `${gx}_${gy}`,
        x: gx * SX,
        y: gy * SY + COL_SHIFT[c],
        src: PHOTOS[(r * COLS + c) % PHOTOS.length],
      })
    }
  }
  return out
}

/**
 * SELECTED WORK › PHOTOGRAPH —— 可无限拖拽的照片墙。
 *
 * 整改：
 * - 不再一次铺 3×3 个 tile 共 144 个图片节点；改为按可见区虚拟化，
 *   只渲染视口内 + 一圈余量的格子（1320×724 下实测 25 个）。
 * - 拖拽偏移存在 ref 里，逐帧只写一次平面 transform，不每帧 setState。
 * - React 只在“可见格子集合”变化时重渲染；静止时既没有 rAF 也没有 render。
 */
export default function PhotographWall() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const planeRef = useRef<HTMLDivElement>(null)
  const off = useRef({ x: 0, y: 0 })
  const vel = useRef({ x: 0, y: 0 })
  const drag = useRef({ on: false, x: 0, y: 0, ox: 0, oy: 0 })
  const winRef = useRef<Win>({ gx0: 0, gx1: -1, gy0: 0, gy1: -1 })
  const stepRef = useRef<FrameFn | null>(null)
  const [cells, setCells] = useState<Cell[]>([])

  /** 写平面位移，并在可见窗口变化时才触发一次 React 更新 */
  const paint = useCallback(() => {
    const field = fieldRef.current
    const plane = planeRef.current
    if (!field || !plane) return

    // 极端长距离拖拽后归一化，网格周期为 TW / TH，归一化不改变任何格子的内容
    if (Math.abs(off.current.x) > RENORM) off.current.x = mod(off.current.x, TW)
    if (Math.abs(off.current.y) > RENORM) off.current.y = mod(off.current.y, TH)

    const { x, y } = off.current
    plane.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`

    const hw = (field.clientWidth / 2) * PERSP + MARGIN_X
    const hh = (field.clientHeight / 2) * PERSP + MARGIN_Y
    const next: Win = {
      gx0: Math.ceil((-hw - x) / SX),
      gx1: Math.floor((hw - x) / SX),
      gy0: Math.ceil((-hh - y - MAX_SHIFT) / SY),
      gy1: Math.floor((hh - y) / SY),
    }
    const cur = winRef.current
    if (
      next.gx0 !== cur.gx0 ||
      next.gx1 !== cur.gx1 ||
      next.gy0 !== cur.gy0 ||
      next.gy1 !== cur.gy1
    ) {
      winRef.current = next
      setCells(buildCells(next))
    }
  }, [])

  /* 唯一的帧回调：拖拽跟手 → 惯性 → 归零即停 */
  useEffect(() => {
    stepRef.current = () => {
      if (drag.current.on) {
        paint()
        return true
      }
      const v = vel.current
      if (Math.abs(v.x) > STOP_V || Math.abs(v.y) > STOP_V) {
        v.x *= 0.93
        v.y *= 0.93
        off.current.x += v.x
        off.current.y += v.y
        paint()
        return true
      }
      v.x = 0
      v.y = 0
      paint() // 落位帧
      return false
    }
    const step = stepRef.current
    return () => stopFrames(step)
  }, [paint])

  const wake = useCallback(() => {
    if (stepRef.current) startFrames(stepRef.current)
  }, [])

  /* 首次铺格 + 视口尺寸变化重算窗口；离开栏目时断开图片引用 */
  useLayoutEffect(() => {
    paint()
    const field = fieldRef.current
    const ro = new ResizeObserver(() => paint())
    if (field) ro.observe(field)
    return () => {
      ro.disconnect()
      releaseImages(field)
    }
  }, [paint])

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      off.current.x -= e.deltaX * 0.9
      off.current.y -= e.deltaY * 0.9
      wake() // 只借一帧把新位置画出去，随后自动停
    }
    window.addEventListener('wheel', onWheel, { passive: true })
    return () => window.removeEventListener('wheel', onWheel)
  }, [wake])

  const onDown = (e: React.PointerEvent) => {
    drag.current = { on: true, x: e.clientX, y: e.clientY, ox: off.current.x, oy: off.current.y }
    vel.current = { x: 0, y: 0 }
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    wake()
  }
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current.on) return
    const nx = drag.current.ox + (e.clientX - drag.current.x)
    const ny = drag.current.oy + (e.clientY - drag.current.y)
    vel.current = { x: (nx - off.current.x) * 0.55, y: (ny - off.current.y) * 0.55 }
    off.current = { x: nx, y: ny }
    wake()
  }
  const onUp = () => {
    if (!drag.current.on) return
    drag.current.on = false
    wake() // 惯性继续用同一个调度器
  }

  return (
    <div className="wv pw">
      <BackToFolders />
      <div
        ref={fieldRef}
        className="pw__field"
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div className="pw__persp">
          <div ref={planeRef} className="pw__plane">
            {cells.map((c) => (
              <figure
                key={c.key}
                className="pw__cell"
                style={{ left: c.x, top: c.y, width: CELL_W, height: CELL_H }}
              >
                <img
                  {...workImage('photo', c.src)}
                  sizes={SIZES.photo}
                  alt=""
                  decoding="async"
                  draggable={false}
                />
                <span className="pw__veil" />
              </figure>
            ))}
          </div>
        </div>
        <div className="pw__vignette" aria-hidden />
      </div>
      <p className="wv__tip pw__tip">DRAG TO EXPLORE · HOVER TO REVEAL</p>
    </div>
  )
}
