import type { ComponentType } from 'react'
import type { ExperienceSceneSnapshot } from '../../../store'

declare const Experience: ComponentType<{
  initialSceneSnapshot?: ExperienceSceneSnapshot
  onStationChange?: (station: number | null) => void
  onSceneSnapshotChange?: (snapshot: ExperienceSceneSnapshot) => void
  onSceneReady?: () => void
}>

export default Experience
