import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import { Contexts } from '@/components/Contexts'
import { Navigation } from '@/components/Navigation'

export const metadata: Metadata = {
  title: 'Jens Ochsenmeier',
  description: 'Homepage of Jens Ochsenmeier',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☺️</text></svg>'
  }
}

const sans = Atkinson_Hyperlegible({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700']
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(sans.variable, 'font-sans min-h-screen')}>
        <Contexts>
          <main className="w-full max-w-7xl mx-auto py-6 lg:py-12 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="flex flex-col gap-5 pt-24">
              <div className="prose dark:prose-invert">
                <h1>Hi!</h1>
                <p>
                  I'm Jens Ochsenmeier. I (enable teams to) build high-quality fullstack
                  applications that turn machine learning models into actionable insights and
                  decisions.
                </p>
              </div>
              <div className="flex flex-row lg:flex-col flex-wrap gap-3">
                <div>
                  <a href="https://github.com/jens-ox" target="_blank" className="button">
                    <GitHubLogoIcon /> <span>GitHub</span>
                  </a>
                </div>
                <div>
                  <a href="https://www.linkedin.com/in/jens-ox/" target="_blank" className="button">
                    <LinkedInLogoIcon /> <span>LinkedIn</span>
                  </a>
                </div>
                <div>
                  <a href="mailto:hi@jens-ox.de" className="button">
                    <EnvelopeClosedIcon /> <span>Mail</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-12">
              <Navigation />
              <div>{children}</div>
            </div>
          </main>
        </Contexts>
      </body>
    </html>
  )
}
