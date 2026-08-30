import { useCallback, useRef, useState } from 'react'
import { EXPERIENCES } from '../../data/experience'
import { INITIAL_EXPERIENCE_SCENE_SNAPSHOT, type ExperienceSceneSnapshot, useStore } from '../../store'
import CloseButton from './CloseButton'
import PandaExperience from './pandaExperience/Experience'
import { stationAtProgress } from './pandaExperience/stations'
import { completeExperienceReturn } from '../work/workTransition'
import './experience.css'

/** 原项目场景及镜头路径直接迁入；此层只叠加对应经历文字。 */
export default function ExperienceJourney() {
  const experienceSceneSnapshot = useStore((s) => s.experienceSceneSnapshot)
  const [activeStation, setActiveStation] = useState<number | null>(() => experienceSceneSnapshot.activeStation ?? stationAtProgress(experienceSceneSnapshot.scrollProgress))
  const openExperienceWork = useStore((s) => s.openExperienceWork)
  const sceneSnapshotRef = useRef<ExperienceSceneSnapshot>(experienceSceneSnapshot ?? INITIAL_EXPERIENCE_SCENE_SNAPSHOT)
  const onStationChange = useCallback((station: number | null) => {
    setActiveStation((current) => current === station ? current : station)
  }, [])
  const item = activeStation === null ? null : EXPERIENCES[activeStation]

  return (
    <section className="ov exp panda-exp" aria-label="四段实习经历场景漫游">
      <div className="panda-exp__canvas"><PandaExperience initialSceneSnapshot={experienceSceneSnapshot} onSceneReady={completeExperienceReturn} onSceneSnapshotChange={(snapshot: ExperienceSceneSnapshot) => { sceneSnapshotRef.current = snapshot }} onStationChange={onStationChange} /></div>
      <CloseButton />
      <p className="panda-exp__hint" aria-hidden>SCROLL / DRAG TO EXPLORE</p>
      <div className={`panda-exp__copy${item ? ' is-visible' : ''}`} aria-live="polite">
        {item && (
          <article key={item.company}>
            <p className="panda-exp__meta">{String((activeStation ?? 0) + 1).padStart(2, '0')} / {item.time}</p>
            <p className="panda-exp__company">{item.company} / {item.companyCn}</p>
            <h3 className={item.id === 'douyin' ? 'panda-exp__title--long' : undefined}>{item.role}</h3>
            <p className="panda-exp__role">{item.cardScope}</p>
            <p className="panda-exp__summary">{item.cardSummary}</p>
            <button className="panda-exp__projects" type="button" onClick={() => openExperienceWork(item.id, sceneSnapshotRef.current)}>VIEW PROJECTS →</button>
          </article>
        )}
      </div>
    </section>
  )
}
