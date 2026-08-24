import { SITE } from '../data/content'
import { useStore } from '../store'
import './intro.css'

/** 柜体旁的极简自我介绍，不打断原有首屏场景。 */
export default function Intro() {
  const openOverlay = useStore((s) => s.openOverlay)
  return (
    <aside className="intro" aria-label="个人简介">
      <p>{SITE.intro}</p>
      <button type="button" onClick={() => openOverlay('work')}>
        {SITE.cta} <span aria-hidden>→</span>
      </button>
    </aside>
  )
}
