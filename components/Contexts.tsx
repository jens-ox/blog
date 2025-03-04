'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export const Contexts = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>
}
