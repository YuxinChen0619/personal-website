import { lazy, Suspense } from 'react'
import type { ExperienceId } from '../../data/experience'
import { useStore, type WorkView } from '../../store'
import CloseButton from './CloseButton'
import './overlay.css'
import './folders.css'

const DesignView = lazy(() => import('../work/DesignView'))
const PhotographWall = lazy(() => import('../work/PhotographWall'))
const ExperienceCaseStudy = lazy(() => import('../work/ExperienceCaseStudy'))

type Folder = { id: Exclude<WorkView, null>; en: string[]; cn: string; bg: string; fg: string; cnFg: string; z: number }

const FOLDERS: Folder[] = [
  { id: 'alibaba', en: ['AI', 'AGENT'], cn: '淘宝闪购', bg: '#0b0b0d', fg: '#e0322a', cnFg: '#e0322a', z: 2 },
  { id: 'design', en: ['DESIGN', 'BOOK'], cn: '个人设计作品集', bg: '#c8f322', fg: '#1b28d8', cnFg: '#1b28d8', z: 4 },
  { id: 'xiaohongshu', en: ['UGC', 'GROWTH'], cn: '小红书商业化', bg: '#1b28d8', fg: '#c8f322', cnFg: '#ffffff', z: 3 },
  { id: 'tiktok', en: ['GLOBAL', 'AIGC'], cn: 'TikTok 商业化', bg: '#f8f8f6', fg: '#14161a', cnFg: '#14161a', z: 2 },
  { id: 'douyin', en: ['GROWTH', 'STRATEGY'], cn: '抖音电商', bg: '#f5c8ab', fg: '#17242c', cnFg: '#17242c', z: 5 },
  { id: 'photography', en: ['PHOTO', 'STORIES'], cn: '个人摄影作品', bg: '#d9e4f2', fg: '#243b53', cnFg: '#243b53', z: 1 },
]

/* 六个文件夹的版位（相对 1320×724 底稿换算成百分比） */
const POS: Record<string, { l: number; t: number; w: number; h: number; rot: number }> = {
  alibaba: { l: 12.0, t: 46.5, w: 19.3, h: 30.4, rot: -6 },
  design: { l: 33.0, t: 27.6, w: 29.2, h: 44.2, rot: -7 },
  xiaohongshu: { l: 55.3, t: 8.2, w: 23.1, h: 35.9, rot: 3 },
  tiktok: { l: 53.5, t: 65.0, w: 22.3, h: 31.8, rot: 2 },
  douyin: { l: 74.0, t: 39.0, w: 20.2, h: 30.4, rot: 6 },
  photography: { l: 7.0, t: 8.0, w: 19.0, h: 29.0, rot: -3 },
}

export default function WorkFolders() {
  const workView = useStore((s) => s.workView)
  const setWorkView = useStore((s) => s.setWorkView)
  const setWorkOrigin = useStore((s) => s.setWorkOrigin)

  if (workView) {
    return (
      <Suspense fallback={<div className="wv wv--loading" />}>
        {workView === 'design' && <DesignView />}
        {workView === 'photography' && <PhotographWall />}
        {workView !== 'design' && workView !== 'photography' && <ExperienceCaseStudy id={workView as ExperienceId} />}
      </Suspense>
    )
  }

  return (
    <div className="ov">
      <CloseButton />
      <div className="fw">
        <Star className="fw__star fw__star--yellow" points={12} color="#f6dc86" />
        <Star className="fw__star fw__star--lime" points={10} color="#c8f322" />

        {FOLDERS.map((f, i) => {
          const p = POS[f.id]
          return (
            <button
              key={f.id}
              type="button"
              className="fold"
              aria-label={`${f.en.join(' ')} ${f.cn}`}
              onClick={() => {
                setWorkOrigin('folders')
                setWorkView(f.id as WorkView)
              }}
              style={
                {
                  left: `${p.l}%`,
                  top: `${p.t}%`,
                  width: `${p.w}%`,
                  height: `${p.h}%`,
                  zIndex: f.z,
                  '--rot': `${p.rot}deg`,
                  '--bg': f.bg,
                  '--fg': f.fg,
                  '--cnfg': f.cnFg,
                  animationDelay: `${0.06 * i}s`,
                } as React.CSSProperties
              }
            >
              <span className="fold__back" />
              <span className="fold__papers">
                <i />
                <i />
                <i />
              </span>
              <span className="fold__front">
                <span className="fold__en">
                  {f.en.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </span>
                <span className="fold__cn">{f.cn}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function Star({ points, color, className }: { points: number; color: string; className?: string }) {
  const pts: string[] = []
  const n = points * 2
  for (let i = 0; i < n; i++) {
    const r = i % 2 === 0 ? 50 : 30
    const a = (Math.PI * 2 * i) / n - Math.PI / 2
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`)
  }
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden>
      <polygon points={pts.join(' ')} fill={color} />
    </svg>
  )
}
