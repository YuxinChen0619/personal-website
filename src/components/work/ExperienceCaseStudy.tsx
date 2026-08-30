import { experienceById, type ExperienceId } from '../../data/experience'
import BackToFolders from './BackToFolders'
import './experience-case.css'

export default function ExperienceCaseStudy({ id }: { id: ExperienceId }) {
  const experience = experienceById(id)
  if (!experience) return null

  return (
    <article className="wv ecs">
      <BackToFolders />
      <header className="ecs__hero">
        <p className="ecs__eyebrow">{experience.no} / {experience.eyebrow}</p>
        <h1>{experience.company}</h1>
        <p className="ecs__cn">{experience.companyCn}</p>
        <div className="ecs__meta">
          <span>{experience.role}</span><span>{experience.time}</span>{experience.location && <span>{experience.location}</span>}
        </div>
        <p className="ecs__summary">{experience.summary}</p>
      </header>

      <div className="ecs__projects">
        {experience.projects.map((project, index) => (
          <section className="ecs__project" key={project.id}>
            <p className="ecs__index">PROJECT {String(index + 1).padStart(2, '0')}</p>
            <h2>{project.title}</h2>
            <p className="ecs__tagline">{project.tagline}</p>
            <div className="ecs__narrative">
              <section><span>BACKGROUND</span><p>{project.background}</p></section>
              <section><span>OBJECTIVE</span><p>{project.objective}</p></section>
              <section className="ecs__approach"><span>APPROACH</span><ol>{project.approach.map((item) => <li key={item}>{item}</li>)}</ol></section>
            </div>
            {project.flow && (
              <div className="ecs__flow" aria-label="项目执行流程">
                <span>FLOW</span>
                <div>{project.flow.map((step, i) => <><b key={step}>{step}</b>{i < project.flow!.length - 1 && <i key={`${step}-arrow`}>→</i>}</>)}</div>
              </div>
            )}
            {project.impacts && (
              <div className="ecs__impacts">
                {project.impacts.map((impact) => <article key={impact.value}><strong>{impact.value}</strong><span>{impact.label}</span>{impact.detail && <small>{impact.detail}</small>}</article>)}
              </div>
            )}
            {project.status && (
              <div className="ecs__status"><span>{project.status.title}</span><div>{project.status.metrics.map((metric) => <b key={metric}>{metric}</b>)}</div></div>
            )}
            <p className="ecs__closing">{project.closing}</p>
          </section>
        ))}
      </div>
    </article>
  )
}
