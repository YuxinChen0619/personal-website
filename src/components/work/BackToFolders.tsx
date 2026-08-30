import { useStore } from '../../store'
import { sweepBackToExperience, sweepBackToFolders } from './workTransition'

/** 作品子页面左上角的返回入口；返回时播放米黄色径向遮罩过渡 */
export default function BackToFolders() {
  const workOrigin = useStore((s) => s.workOrigin)
  const returnFromWork = useStore((s) => s.returnFromWork)
  const fromExperience = workOrigin === 'experience'
  return (
    <button
      type="button"
      className={`wv__back${fromExperience ? ' wv__back--experience' : ''}`}
      onClick={() => {
        if (fromExperience) sweepBackToExperience(returnFromWork)
        else sweepBackToFolders(returnFromWork)
      }}
    >
      <span>←</span> {fromExperience ? 'BACK TO EXPERIENCE' : 'BACK TO FOLDERS'}
    </button>
  )
}
