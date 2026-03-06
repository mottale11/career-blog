'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

export function AdsenseScript() {
    const pathname = usePathname();

    // Do not load AdSense on admin panel pages
    if (pathname.startsWith('/admin')) return null;

    return (
        <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6472755209598696"
            crossOrigin="anonymous"
            strategy="afterInteractive"
        />
    );
}
