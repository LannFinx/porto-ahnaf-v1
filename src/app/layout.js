// app/layout.js
import { LanguageProvider } from '@/context/LanguageContext'; // <── IMPOR PROVIDER
import './globals.css';

export const metadata = {
  title: 'Ahnaf Isa — Software Engineer & UI/UX Designer',
  description:
    'Portfolio pribadi Muhammad Ahnaf Isa Hammam Lisualla. Software Engineer & UI/UX Designer yang berfokus pada pengembangan web modern dan interaktif.',
  keywords: ['software engineer', 'ui/ux designer', 'web developer', 'next.js', 'react'],
  authors: [{ name: 'Muhammad Ahnaf Isa Hammam Lisualla' }],
  openGraph: {
    title: 'Ahnaf Isa — Software Engineer',
    description: 'Lihat karya dan proyek pengembangan web modern saya.',
    url: 'https://porto-ahnaf-v1.vercel.app/',
    siteName: 'Ahnaf Portfolio',
    images: [
      {
        url: 'https://porto-ahnaf-v1.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahnaf Isa — Software Engineer',
    description: 'Lihat karya dan proyek pengembangan web modern saya.',
    images: ['https://porto-ahnaf-v1.vercel.app/og-image.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Bungkus dengan LanguageProvider di sini */}
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}