import { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useStore, type Overlay } from '../../store'
import { captureOpener, resolveRestoreTarget } from './overlayFocus'
import { useDialog } from './useDialog'
import { OVERLAY_EXIT_MS, useOnOverlayUnmounted, useOverlayLifecycle } from './useOverlayLifecycle'
import './overlay.css'

const AboutCard = lazy(() => import('./AboutCard'))
const SkillsDeck = lazy(() => import('./SkillsDeck'))
const WorkFolders = lazy(() => import('./WorkFolders'))
const ContactBoard = lazy(() => import('./ContactBoard'))

const BODIES = {
  about: AboutCard,
  skills: SkillsDeck,
  work: WorkFolders,
  contact: ContactBoard,
} as const

/** 屏幕阅读器读到的浮层标题，供 aria-labelledby 引用 */
const TITLES = {
  about: 'ABOUT 个人信息工牌',
  skills: 'SKILLS 技能卡',
  work: 'SELECTED WORK 作品文件夹',
  contact: 'CONTACT 软木板留言',
} as const

const TITLE_ID = 'overlay-title'

/** 场景状态机记录的入口类型；store 尚未提供时返回 null，回退到导航按钮 */
function readOverlaySource(): 'hotspot' | 'nav' | null {
  const s = useStore.getState() as { scene?: { source?: 'hotspot' | 'nav' | null } }
  return s.scene?.source ?? null
}

/**
 * 四个内容浮层的统一宿主。
 *
 * 职责：
 * - 把 store 的 `overlay` 展开成 opening / open / closing 三态
 * - 关闭时先播退出动画，播完才卸载，绝不点完就 unmount
 * - dialog 语义、背景 inert、focus trap、Escape 关闭、焦点归还
 *
 * 对外不需要 props：自己从 store 读状态。App 只要渲染 `<OverlayHost />`。
 */
export default function OverlayHost() {
  const overlay = useStore((s) => s.overlay)
  const workView = useStore((s) => s.workView)
  const reduced = useReducedMotion()
  const { active, phase } = useOverlayLifecycle(overlay, reduced)
  const dialogRef = useRef<HTMLDivElement>(null)

  // 打开的那一刻记住来源元素，关闭后焦点要还回去
  const sourceRef = useRef<HTMLElement | null>(null)
  const kindRef = useRef<'hotspot' | 'nav' | null>(null)
  const lastIdRef = useRef<Exclude<Overlay, null>>('about')
  useEffect(() => {
    // 只在打开 / 切换浮层时更新；关闭时保留来源，等退出动画播完再归还
    if (!overlay) return
    sourceRef.current = captureOpener()
    kindRef.current = readOverlaySource()
  }, [overlay])
  useEffect(() => {
    if (active) lastIdRef.current = active
  }, [active])

  // 退出动画播完、浮层真正卸载之后，把焦点还给打开它的元素
  useOnOverlayUnmounted(active, () => {
    const source = sourceRef.current
    const kind = kindRef.current
    sourceRef.current = null
    kindRef.current = null
    // 用户已经把焦点移到别处时不要抢回来
    const cur = document.activeElement
    if (cur && cur !== document.body && cur !== document.documentElement) return
    resolveRestoreTarget(lastIdRef.current, source, kind)?.focus({ preventScroll: true })
  })

  // Escape：作品子页面先退回文件夹，再按一次才关闭整个浮层
  const onEscape = useCallback(() => {
    const st = useStore.getState()
    if (st.workView) st.setWorkView(null)
    else st.closeOverlay()
  }, [])

  useDialog({
    ref: dialogRef,
    active: !!active,
    // 进入动画结束后才接管焦点；子视图切换时重新接管
    focusKey: active && phase !== 'opening' ? `${active}:${workView ?? ''}` : null,
    onEscape,
  })

  if (!active) return null

  const Body = BODIES[active]

  return (
    <div
      className="ovh"
      data-phase={phase}
      data-overlay={active}
      style={{ ['--ovh-exit' as string]: `${reduced ? 0 : OVERLAY_EXIT_MS}ms` }}
    >
      <div
        ref={dialogRef}
        className="ovh__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
      >
        <h2 id={TITLE_ID} className="ovh__title">
          {TITLES[active]}
        </h2>
        <Suspense fallback={null}>
          <Body />
        </Suspense>
      </div>
    </div>
  )
}
