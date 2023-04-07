import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import cx from 'clsx'

import { GithubIcon, LinkedinIcon } from 'lucide-react'
import { inter, sourceCodePro } from '../utils/font'
import { NavBar } from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
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
          <NavBar />
          <div className="prose py-12 px-4">
            <Component {...pageProps} />
          </div>
        </div>
        <footer className="border-t border-slate-200 p-4 mt-6 text-sm text-slate-500">
          <div className="flex items-center justify-between">
            <span>{new Date().getFullYear()}, Jens Ochsenmeier</span>
            <div className="flex items-center gap-2">
              <a
                className="cursor-pointer hover:text-slate-800"
                href="https://www.linkedin.com/in/jens-ox"
                target="_blank"
                rel="noreferrer"
              >
                <LinkedinIcon width={16} height={16} />
              </a>
              <a
                className="cursor-pointer hover:text-slate-800"
                href="https://github.com/jens-ox"
                target="_blank"
                rel="noreferrer"
              >
                <GithubIcon width={16} height={16} />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default MyApp
