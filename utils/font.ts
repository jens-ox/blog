import { Atkinson_Hyperlegible, Source_Code_Pro } from 'next/font/google'

export const sans = Atkinson_Hyperlegible({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '700']
})

export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-source-code-pro'
})
