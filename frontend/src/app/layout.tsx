import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NEEKZ Special — Artisanal Treasures from Jammu & Kashmir',
  description:
    'Premium handcrafted gourmet food from the Himalayan heartland. Artisan Basmati Rice, dry fruits, whole spices, and heritage products sourced directly from Jammu & Kashmir.',
  keywords: 'Jammu Kashmir food, artisan basmati rice, dry fruits, spices, Bhaderwahi rajmash, Kashmiri noon chai, luxury gourmet',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#F4EFE8' }}>
        {children}
      </body>
    </html>
  );
}
