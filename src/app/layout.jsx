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

import GlobalEffects from '@/components/common/GlobalEffects'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TPFGQVPJ');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TPFGQVPJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <ScrollToTop />
        <BookingProvider>
          <GlobalEffects>
            {children}
          </GlobalEffects>
        </BookingProvider>
      </body>
    </html>
  )
}

