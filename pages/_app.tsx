import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import cx from 'clsx'
import NavLink from '../components/NavLink'

import { inter, sourceCodePro } from '../utils/font'

const socials = [
  {
    icon: faLinkedin,
    link: 'https://www.linkedin.com/in/jens-ox'
  },
  {
    icon: faGithub,
    link: 'https://github.com/jens-ox'
  }
]

const GermanStrings = {
  HOME: 'Start',
  PROJECTS: 'Projekte',
  BLOG: 'Blog',
  UNI: 'Universität'
}

const EnglishStrings = {
  HOME: 'Home',
  PROJECTS: 'Projects',
  BLOG: 'Blog',
  UNI: 'University'
}

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter()

  const strings = useMemo(() => (locale === 'en' ? EnglishStrings : GermanStrings), [locale])
  return (
    <div className={cx('min-h-screen', sourceCodePro.variable)}>
      <Head>
        <title>Jens Ochsenmeier</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>😊</text></svg>"
        />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta name="description" content="Get insights into the quality of your JS/TS codebase" />
        <style>{`
          :root {
            --font-inter: ${inter.style.fontFamily}
          }
        `}</style>
      </Head>
      <div className="flex flex-col justify-between min-h-screen max-w-prose mx-auto">
        <div>
          <header className="py-4">
            <div className="flex items-center gap-6 -ml-4">
              <div className="flex items-center">
                <NavLink href="/" text={strings.HOME} />
                <NavLink href="/projects" text={strings.PROJECTS} />
                <NavLink href="/blog" text={strings.BLOG} />
                <NavLink href="/uni" text={strings.UNI} />
              </div>
            </div>
          </header>
          <div className="prose dark:prose-invert py-12">
            <Component {...pageProps} />
          </div>
        </div>
        <footer className="border-t border-stone-200 dark:border-stone-500 py-4 mt-6 text-sm text-stone-500 dark:text-stone-400">
          <div className="flex items-center justify-between">
            <span>{new Date().getFullYear()}, Jens Ochsenmeier</span>
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <div className="cursor-pointer hover:text-stone-800 dark:hover:text-stone-300" key={`socials-${i}`}>
                  <a href={s.link}>
                    <FontAwesomeIcon icon={s.icon} width={16} height={16} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default MyApp
