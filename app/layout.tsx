import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Aetrax | Enterprise AI, Delivered with Engineering Rigour',
  description:
    'Aetrax designs, builds and operates secure, measurable enterprise AI systems — from strategy and generative AI to document intelligence, agentic automation and sovereign AI.',
  keywords: [
    'enterprise AI',
    'AI engineering',
    'private AI',
    'sovereign AI',
    'generative AI',
    'AI automation',
    'document intelligence',
    'agentic AI',
    'AI governance',
    'AI operations',
  ],
  authors: [{ name: 'Aetrax' }],
  creator: 'Aetrax',
  publisher: 'Aetrax',
  metadataBase: new URL('https://aetrax.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aetrax.in',
    siteName: 'Aetrax',
    title: 'Aetrax | Enterprise AI, Delivered with Engineering Rigour',
    description:
      'Aetrax designs, builds and operates secure, measurable enterprise AI systems — from strategy and generative AI to document intelligence, agentic automation and sovereign AI.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Aetrax — Enterprise AI, Delivered with Engineering Rigour',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aetrax | Enterprise AI, Delivered with Engineering Rigour',
    description:
      'Aetrax designs, builds and operates secure, measurable enterprise AI systems — from strategy and generative AI to document intelligence, agentic automation and sovereign AI.',
    images: ['/og-image.png'],
    creator: '@aetrax',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body
        className="bg-[#0A0A0F] text-[#F0F0F5] font-sans antialiased min-h-screen"
        style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
