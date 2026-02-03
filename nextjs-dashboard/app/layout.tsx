import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

const baseUrl = process.env.NODE_ENV === 'production' ? 'https://nextjs-dashboard-nine-psi-50.vercel.app' : 'http://localhost:3000';

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard'
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  other: {
    google: ['notranslate', 'nositelinkssearchbox'],
  },
  metadataBase: new URL(baseUrl),
  // alternates: {
  //   canonical: 'https://example.com/blog/original-post'
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
