import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import NavLink from '../components/NavLink'

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
    <div className="min-h-screen">
      <Head>
        <title>Jens Ochsenmeier</title>
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
            <span>2022, Jens Ochsenmeier</span>
            <div className="flex items-center gap-2">
              {socials.map((s, i) => (
                <div className="cursor-pointer hover:text-stone-800 dark:hover:text-stone-300" key={`socials-${i}`}>
                  <Link href={s.link}>
                    <FontAwesomeIcon icon={s.icon} />
                  </Link>
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
