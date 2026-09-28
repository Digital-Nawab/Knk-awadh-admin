import '../styles/globals.css'
import ScrollToTop from '../layout/ScrollToTop'
import { BookingProvider } from '@/context/BookingContext'
import { Cormorant_Garamond, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-cormorant',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://knksalonawadh.com'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "KNK Salon Awadh | Luxury Hair, Skin & Bridal Studio",
  description:
    "KNK Salon, Awadh Lucknow — hair colour, keratin, facials and bridal makeup. Spin the Lucky Wheel for an instant discount and book instantly.",
  icons: {
    icon: '/assets/images/new/logo.png',
    shortcut: '/assets/images/new/logo.png',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <ScrollToTop />
        <BookingProvider>
          {children}
        </BookingProvider>
      </body>
    </html>
  )
}

