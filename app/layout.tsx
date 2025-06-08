import type { Metadata } from "next"
import "./globals.css"
import { Roboto } from "next/font/google"
import localFont from "next/font/local"

const robotoFont = Roboto({
  subsets: ["latin"],
  style: "normal",
  display: "swap",
  variable: "--font-roboto",
})

const vazirFont = localFont({
  src: [
    {
      path: "../public/fonts/vazirmatn/Vazirmatn[wght].woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "A simple currency converter app created by Mehran Shahani for Rira's Front End Intern task.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html dir="rtl" lang="fa-IR">
      <body className={`${vazirFont.variable} ${robotoFont.variable} antialiased flex flex-col items-center justify-center h-screen`}>
        {children}
      </body>
    </html>
  )
}
