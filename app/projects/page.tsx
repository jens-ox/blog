import { Link2Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { ReactNode } from 'react'

type Project = {
  title: string | ReactNode
  link: string
  alt?: string
  description: ReactNode
  tools?: string[]
  inDev?: boolean
}

const projects: Project[] = [
  {
    title: 'Munigrid',
    link: 'https://munigrid.de',
    description: (
      <>
        Munigrid is a data management and sharing platform for Germany's public sector which I'm
        developing together with the city of Herrenberg, where I'm doing voluntary work to help with
        digitalization. It allows municipalities and other bodies of the public sector to securely
        share data internally, with external partners and publish datasets as Open Data.
      </>
    ),
    tools: [
      'Next.js',
      'TailwindCSS',
      'Radix UI',
      'TypeScript',
      'Cloudflare R2',
      'PostgreSQL',
      'GitHub Actions'
    ]
  },
  {
    title: 'Open Data Aggregator',
    inDev: false,
    link: 'https://krake.dev',
    description: (
      <>
        Open Data Aggregator is a plattform that aggregates different publicly accessible data
        sources, adds schemas, versions the data and makes it accessible via a well-documented API.
      </>
    ),
    tools: ['Next.js', 'TailwindCSS', 'Radix UI', 'TypeScript', 'GitHub Actions']
  },
  {
    title: 'Georanker',
    inDev: true,
    link: 'https://georanker.de',
    description: (
      <>
        <p>
          I built Georanker as part of my search for a great place to live in Germany. It allows
          users to specify factors important to them and ranks every hectare of living space in
          Germany against those factors. For that, it uses publicly available data like noise maps
          and geographical data of forests and other points of interest.
        </p>
        <p>
          To achieve good performance, the compute backend has been written in fully-parallelized
          Rust.
        </p>
      </>
    ),
    tools: ['Next.js', 'TailwindCSS', 'TypeScript', 'PostGIS', 'Rust', 'QGIS']
  },
  {
    title: 'NiiVue',
    link: 'https://github.com/niivue/niivue',
    description: (
      <>
        <p>
          NiiVue is a WebGL-based medical image viewer mainly developed by the Neuroscience
          department of the University of Oxford.
        </p>
        <p>
          I helped with different aspects of code modernization, which included porting the whole
          core library to TypeScript.
        </p>
      </>
    ),
    tools: ['TypeScript', 'WebGL']
  },
  {
    title: 'Open Data guidelines for German municipalities',
    link: 'https://www.open-data-kommunal.de/',
    description: (
      <>
        To help facilitate the publishing of datasets as Open Data in my voluntary work at the city
        of Herrenberg, I wrote some guidelines on the ideas and principles of Open Data and how they
        can be applied by municipalities.
      </>
    )
  },
  {
    title: 'Simstruct',
    link: 'https://github.com/jens-ox/simstruct',
    description: (
      <>
        <p>
          Most code duplication detection uses the{' '}
          <a href="https://en.wikipedia.org/wiki/Rabin%E2%80%93Karp_algorithm" target="_blank">
            Rabin-Karp algorithm
          </a>{' '}
          to detect duplication, which only works with identical code - it can't find structural
          duplication or duplication where symbols have been renamed.
        </p>
        <p>
          Simstruct uses methods originally suggested by{' '}
          <a href="https://www.semanticdesigns.com/Company/Publications/ICSM98.pdf">
            Baxter et al.
          </a>{' '}
          by searching for identical subtrees in abstract syntax trees.
        </p>
      </>
    ),
    tools: ['TypeScript', 'SWC', 'AST parsing']
  },
  {
    title: 'Component Library Library',
    link: 'https://cll-web.vercel.app/',
    description: (
      <>
        I've often seen teams struggling with setting up proper React component sharing across their
        UIs. The component library library is a showcase of different component sharing setups.
      </>
    ),
    tools: ['React', 'Vite', 'TailwindCSS', 'Material UI', 'TypeScript']
  },
  {
    title: 'MetricsGraphics',
    link: 'https://metricsgraphicsjs.org/',
    description: (
      <>
        Originally developed at Mozilla, MetricsGraphics is a charting library for time series
        visualization. I rewrote MetricsGraphics entirely while being on short-time work during the
        beginning of Covid.
      </>
    ),
    tools: ['TypeScript', 'D3']
  }
]

export default () => {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((p, i) => (
        <div
          key={`resume-entry-${i}`}
          className={clsx(
            'flex flex-col gap-2 pb-4',
            i !== projects.length - 1 && 'border-b border-gray-200 dark:border-gray-600'
          )}
        >
          <div className="flex items-center gap-5">
            <h2 className="font-bold text-lg">{p.title}</h2>
            {p.inDev ? (
              <span className="text-xs bg-orange-400/50 px-2 rounded-full text-orange-900 dark:text-orange-200">
                in development
              </span>
            ) : null}
          </div>
          <div className="flex gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Link2Icon />
              <a href={p.link} target="_blank" className="underline">
                {p.link}
              </a>
            </div>
          </div>
          <div className="prose prose-sm dark:prose-invert">{p.description}</div>
          {p.tools && p.tools.length > 0 ? (
            <div className="text-xs flex flex-wrap gap-3">
              {p.tools?.map((t, j) => (
                <span className="pill" key={`entry-${i}-tool-${j}`}>
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
