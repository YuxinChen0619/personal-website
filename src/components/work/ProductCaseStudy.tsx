import { CASE_STUDIES, type CaseStudy } from '../../data/content'
import BackToFolders from './BackToFolders'
import './product-case.css'

export default function ProductCaseStudy({ id }: { id: CaseStudy['id'] }) {
  const study = CASE_STUDIES.find((item) => item.id === id)
  if (!study) return null

  return (
    <article className="wv pcs">
      <BackToFolders />
      <span className="pcs__number">{study.no} / 04</span>
      <header className="pcs__hero">
        <p className="pcs__kicker">{study.kicker}</p>
        <h1>{study.title}</h1>
        <p className="pcs__subtitle">{study.subtitle}</p>
        <p className="pcs__summary">{study.summary}</p>
      </header>

      <div className="pcs__grid">
        <section className="pcs__block pcs__block--context">
          <span>01 / CONTEXT</span>
          <p>{study.context}</p>
        </section>
        <section className="pcs__block">
          <span>02 / MY ROLE</span>
          <p>{study.role}</p>
        </section>
        <section className="pcs__block pcs__block--wide">
          <span>03 / PRODUCT APPROACH</span>
          <ol>
            {study.approach.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </section>
        <section className="pcs__block pcs__block--outcomes">
          <span>04 / RESULTS</span>
          <ul>
            {study.outcomes.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
        <section className="pcs__visual" aria-label="项目配图占位区">
          <span>PROJECT VISUALS</span>
          <p>项目截图 / 流程图将在此补充</p>
        </section>
      </div>
    </article>
  )
}
