/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.152.62.94', 'localhost'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  
  // ─── LAPISAN KEAMANAN HTTP ───
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY', // Mencegah web Anda dibajak ke dalam iframe web lain
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff', // Mencegah browser menebak tipe file (mencegah XSS)
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin', // Melindungi privasi asal trafik pengunjung
          },
        ],
      },
    ];
  },
};

export default nextConfig;