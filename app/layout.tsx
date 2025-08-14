import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MUHIRE Pacifique - Software Engineer & Entrepreneur',
  description: 'Portfolio of MUHIRE Pacifique, a young entrepreneur, software engineer, and COO of Yepper platform based in Kigali, Rwanda.',
  keywords: 'MUHIRE Pacifique, Software Engineer, Entrepreneur, COO, Yepper, React, Node.js, Rwanda, Kigali',
  authors: [{ name: 'MUHIRE Pacifique' }],
  creator: 'MUHIRE Pacifique',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://muhirepacifique.com',
    title: 'MUHIRE Pacifique - Software Engineer & Entrepreneur',
    description: 'Portfolio of MUHIRE Pacifique, a young entrepreneur, software engineer, and COO of Yepper platform.',
    siteName: 'MUHIRE Pacifique Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MUHIRE Pacifique - Software Engineer & Entrepreneur',
    description: 'Portfolio of MUHIRE Pacifique, a young entrepreneur, software engineer, and COO of Yepper platform.',
    creator: '@muhire_pacifique',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}