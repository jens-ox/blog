import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'
import { clsx } from 'clsx'
import { EnvelopeClosedIcon, GitHubLogoIcon, LinkedInLogoIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
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
          <main className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="pt-12 lg:pt-0">
              <div className="flex flex-col md:flex-row lg:flex-col print:flex-row gap-8 sticky top-6 lg:top-12">
                <div className="max-w-[370px] mx-auto lg:max-w-none">
                  <Image
                    className="rounded-lg p-1 bg-white dark:bg-white/5 border border-gray-200 dark:border-gray-200/5 shadow dark:shadow-none"
                    src="/me.jpg"
                    width={1000}
                    height={1000}
                    alt="A picture of me"
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <div className="prose dark:prose-invert print:prose-sm">
                    <h2>Hi!</h2>
                    <p>
                      I&apos;m Jens Ochsenmeier. I lead the Fullstack Engineering Team at{' '}
                      <a href="https://quantco.com" target="_blank" rel="noreferrer">
                        QuantCo
                      </a>
                      .
                    </p>
                    <p>
                      I (enable teams to) build high-quality fullstack applications that turn
                      machine learning models into actionable insights and decisions.
                    </p>
                  </div>
                  <div className="flex flex-row lg:flex-col flex-wrap gap-3 print:hidden">
                    <div>
                      <a
                        href="https://github.com/jens-ox"
                        target="_blank"
                        className="button"
                        rel="noreferrer"
                      >
                        <GitHubLogoIcon /> <span>GitHub</span>
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.linkedin.com/in/jens-ox/"
                        target="_blank"
                        className="button"
                        rel="noreferrer"
                      >
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
              </div>
            </div>
            <div className="col-span-2 flex flex-col gap-12 pb-12">
              <Navigation />
              <div>{children}</div>
            </div>
          </main>
        </Contexts>
      </body>
    </html>
  )
}
