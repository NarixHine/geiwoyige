import type { Metadata } from 'next'
import './globals.css'
import { Noto_Serif_SC } from 'next/font/google'
import { cn } from '@/lib/utils'

const APP_NAME = '给我一个——'
const APP_DEFAULT_TITLE = '给我一个——'
const APP_TITLE_TEMPLATE = '%s - 给我一个——'
const APP_DESCRIPTION = '给我一个——'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
}

const notoSerifSC = Noto_Serif_SC({ subsets: ['latin'], weight: ['400', '600'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <body
        className={cn(notoSerifSC.className)}
      >
        {children}
      </body>
    </html>
  )
}
