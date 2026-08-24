import BackToFolders from './BackToFolders'
import MagazineBook from './MagazineBook'
import './design.css'

/** SELECTED WORK › DESIGN —— 直接翻阅陈羽心的个人设计作品集 */
export default function DesignView() {
  return (
    <div className="wv dv">
      <BackToFolders />
      <span className="dv__index">DESIGN BOOK / 2024</span>
      <section className="dv__sec"><MagazineBook active /></section>
    </div>
  )
}
