// app/layout.js
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
    url: 'https://porto-ahnaf-v1.vercel.app/', // Ganti dengan domain Vercel Anda nanti
    siteName: 'Ahnaf Portfolio',
    images: [
      {
        url: '/og-image.png', // Masukkan screenshot web Anda ke folder 'public' dan beri nama og-image.jpg
        width: 1200,
        height: 630,
        alt: 'Portfolio Preview',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}