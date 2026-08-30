/** Experience 正常地面场景中，各经历卡片对应的漫游区间。 */
export function stationAtProgress(progress: number): number | null {
  if (progress < 0.19) return null
  if (progress < 0.345) return 0
  if (progress < 0.5) return 1
  if (progress < 0.615) return 2
  if (progress < 0.725) return 3
  return null
}
