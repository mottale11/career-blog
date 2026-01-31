import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { ConditionalLayout } from '@/components/conditional-layout';
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://jobsyde.com'),
  title: {
    default: 'Jobsyde',
    template: '%s | Jobsyde',
  },
  description:
    'Your guide to Jobs, Scholarships, Internships, Fellowships, Grants, and Career Development Opportunities.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jobsyde.com',
    siteName: 'Jobsyde',
  },
  verification: {
    google: '46Cid1mY9s4RHwjPmEBokhdo0OmM3Dv0teaqesQpgJw',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col'
        )}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YEJ7E7K9LC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YEJ7E7K9LC');
          `}
        </Script>
        <ConditionalLayout>{children}</ConditionalLayout>
        <Toaster />
      </body>
    </html>
  );
}
