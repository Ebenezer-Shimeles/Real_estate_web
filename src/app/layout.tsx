
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import localFont from 'next/font/local'
import { GoogleOAuthProvider } from '@react-oauth/google'
import {SessionProvider} from '../components/session'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rise Props',
  description: 'Real Estate',
}
const marker = localFont({ src: '../../public/fonts/Rubik_Maps/RubikMaps-Regular.ttf', variable: '--font-rubik-maps' });
// const aleg = localFont({ src: '../../public/fonts/Alegreya/Alegreya-Italic-VariableFont_wght.ttf' });
const singleDay = localFont({ src: '../../public/fonts/Single_Day/SingleDay-Regular.ttf', variable: '--font-single-day'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
 
  return (
    <html lang="en">
      
      
      
      <body className={ ` ${marker.className}   ${inter.className} ${singleDay.className}`}>

          <a href='/'>
            <h1 className={`z-20 hidden md:block md:text-lg left-6 top-6  lg:top-10 lg:left-10  lg:text-4xl fixed italic font-medium   ${marker.className}`} >Rise Properties</h1>
          </a>  
          <SessionProvider>
                {children}
            </SessionProvider>
        
        </body>
    </html>
  )
}
