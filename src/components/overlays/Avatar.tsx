/** 工牌头像的优雅占位；收到本人照片后替换为真实头像。 */
export default function Avatar({ className }: { className?: string }) {
  return (
    <div className={className} role="img" aria-label="头像待更新">
      <span>Y C</span>
      <small>PHOTO<br />COMING SOON</small>
    </div>
  )
}
