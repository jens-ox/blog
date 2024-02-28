import { BackpackIcon, CalendarIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

type Position = {
  title: string | ReactNode
  company: string | ReactNode
  dates: string
  description: string | ReactNode
  tools?: string[]
}

const positions: Position[] = [
  {
    title: 'Fullstack Engineering Lead',
    company: (
      <a href="https://quantco.com" className="underline" target="_blank">
        QuantCo
      </a>
    ),
    dates: 'since 2022',
    description: (
      <>
        I was hired at QuantCo as first Fullstack Engineer. My responsibilities include:
        <ul>
          <li>cleaning up and unifying legacy codebases built by contractors</li>
          <li>building a centralized component library</li>
          <li>implementing best practices across products and projects</li>
          <li>bootstrapping new products</li>
          <li>leading the Fullstack Engineering team</li>
          <li>hiring and onboarding new team members</li>
        </ul>
        We're currently 4 FTEs and manage all UIs across products and projects at QuantCo.
      </>
    ),
    tools: ['Next.js', 'TailwindCSS', 'Radix UI', 'TypeScript', 'GCP', 'GitHub Actions']
  },
  {
    title: 'Senior Software Engineer',
    company: (
      <a href="https://blueyonder.com/" target="_blank" className="underline">
        Blue Yonder
      </a>
    ),
    dates: '2020 - 2022',
    description: (
      <>
        At Blue Yonder, I primarily worked on LDE, a product for supply chain forecasting. I was
        responsible for a full re-write of its UI.
        <ul>
          <li>leading full-stack codebase modernization efforts</li>
          <li>giving company-wide talks on best practices</li>
          <li>working in an internationally distributed and remote-first team</li>
        </ul>
      </>
    ),
    tools: [
      'React',
      'Vite',
      'Fastify',
      'Material UI',
      'Azure',
      'Snowflake',
      'GitHub Actions',
      'Jenkins'
    ]
  },
  {
    title: 'Data Engineering',
    company: 'ArtiMinds Robotics',
    dates: '2018 - 2020',
    description: (
      <>
        As part of my Bachelor's Thesis on analytics of real-time robot data, I wrote a web-based
        solution for robot-first production optimization. I continued working on it after finishing
        my Bachelor's degree, onboarding colleagues onto it.
        <ul>
          <li>
            scaling up development operations from a few students to multiple full-time employees
          </li>
          <li>
            creating and managing modern development and review processes in a Scrum-based
            environment
          </li>
          <li>
            implementing state-of-the-art solutions for production optimization in industrial
            robotics
          </li>
        </ul>
      </>
    )
  },
  {
    title: 'Data Mining Intern',
    company: 'Mercedes-Benz',
    dates: '2017 - 2018',
    description: (
      <>
        At Mercedes-Benz, I worked as part of the Digital Factory Lab on building production-grade
        prototype solutions for production optimization and control.
        <ul>
          <li>
            designing and developing mobile-first early-stage solutions for production control
          </li>
          <li>won first place at company-wide IT hackathon</li>
        </ul>
      </>
    )
  },
  {
    title: 'Research Assistant',
    company: 'Karlsruhe Institute of Technology (KIT)',
    dates: '2015 - 2017',
    description: (
      <>
        I was hired by the Institute of Rock and Soil Mechanics at KIT to help modernize their
        web-based solution for automated rock sample analysis.
        <ul>
          <li>incremental modernization of a large legacy codebase</li>
          <li>working with non-technical peers and users</li>
        </ul>
      </>
    )
  },
  {
    title: 'Bachelor of Science',
    company: 'Karlsruhe Institute of Technology (KIT)',
    dates: '2014 - 2018',
    description: (
      <ul>
        <li>Minor in Mathematics</li>
        <li>
          Thesis: Framework for predictive and prescriptive analytics of real-time robot data in
          modern production environments, grade 1.0
        </li>
      </ul>
    )
  },
  {
    title: 'Abitur',
    company: 'Schickhardt-Gymnasium Herrenberg',
    dates: '2006 - 2014',
    description: (
      <ul>
        <li>Mathematics Award for remarkable accomplishments in Mathematics</li>
        <li>
          Participated in math competitions (1st place Math Competition of University of Tübingen,
          2nd place Math Competition of University of Stuttgart)
        </li>
      </ul>
    )
  }
]

export default () => {
  return (
    <div className="flex flex-col gap-4">
      {positions.map((p, i) => (
        <div
          key={`resume-entry-${i}`}
          className={clsx(
            'flex flex-col gap-2 pb-4',
            i !== positions.length - 1 && 'border-b border-gray-200'
          )}
        >
          <h2 className="font-bold text-lg">{p.title}</h2>
          <div className="flex gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <BackpackIcon />
              <span>{p.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span>{p.dates}</span>
            </div>
          </div>
          <p className="prose prose-sm dark:prose-invert">{p.description}</p>
          {p.tools && p.tools.length > 0 ? (
            <div className="text-xs flex gap-3">
              {p.tools?.map((t, j) => (
                <span
                  className="rounded-full bg-gray-200 px-2 inline-block min-w-12 text-center"
                  key={`entry-${i}-tool-${j}`}
                >
                  {t}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
