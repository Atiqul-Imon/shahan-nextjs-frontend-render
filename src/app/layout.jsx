import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { generateStructuredData } from './structured-data'

const inter = Inter({ subsets: ["latin"] });



export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata = {
  metadataBase: new URL('https://shahanahmed.com'),
  title: "Shahan Ahmed - Full Stack Developer",
  description: "I am a full stack developer, and this is my portfolio.",
  keywords: [
    'Shahan Ahmed',
    'Full Stack Developer',
    'React Developer',
    'Node.js Developer',
    'JavaScript Developer',
    'Web Developer',
    'Portfolio',
    'Blog',
    'Tech Blog',
    'Software Engineer',
    'Frontend Developer',
    'Backend Developer',
    'MERN Stack',
    'Next.js',
    'TypeScript',
    'MongoDB',
    'Express.js',
    'Tailwind CSS',
    'Web Development',
    'Programming',
    'Coding',
    'Technology',
    'Software Development'
  ],
  authors: [{ name: 'Shahan Ahmed', url: 'https://shahanahmed.com' }],
  creator: 'Shahan Ahmed',
  publisher: 'Shahan Ahmed',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shahanahmed.com',
    title: 'Shahan Ahmed - Full Stack Developer & Tech Enthusiast',
    description: 'Personal portfolio and blog of Shahan Ahmed. Full-stack developer specializing in React, Node.js, and modern web technologies.',
    siteName: 'Shahan Ahmed Portfolio',
    images: [
      {
        url: '/shahan_ahmed.png',
        width: 1200,
        height: 630,
        alt: 'Shahan Ahmed - Full Stack Developer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shahanahmed',
    creator: '@shahanahmed',
    title: 'Shahan Ahmed - Full Stack Developer & Tech Enthusiast',
    description: 'Personal portfolio and blog of Shahan Ahmed. Full-stack developer specializing in React, Node.js, and modern web technologies.',
    images: ['/shahan_ahmed.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://shahanahmed.com',
  },
  category: 'technology',
  classification: 'Portfolio and Blog',
  referrer: 'origin-when-cross-origin',
  applicationName: 'Shahan Ahmed Portfolio',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Shahan Ahmed Portfolio',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }) {
  const structuredData = generateStructuredData()
  
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={`${inter.className} font-sans bg-background text-foreground flex flex-col min-h-screen`}>
        <AuthProvider>
          <ThemeProvider>
            <Header />
            <main className="flex-grow container mx-auto p-4">
              {children}
            </main>
            <Toaster richColors />
            <Footer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 