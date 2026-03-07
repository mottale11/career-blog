import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Redirect old mixed/title-case category URLs to correct lowercase slugs
      { source: '/opportunities/Career-Advice', destination: '/opportunities/career-advice', permanent: true },
      { source: '/opportunities/Study-Abroad', destination: '/opportunities/study-abroad', permanent: true },
      { source: '/opportunities/Jobs', destination: '/opportunities/jobs', permanent: true },
      { source: '/opportunities/Scholarships', destination: '/opportunities/scholarships', permanent: true },
      { source: '/opportunities/Internships', destination: '/opportunities/internships', permanent: true },
      { source: '/opportunities/Fellowships', destination: '/opportunities/fellowships', permanent: true },
      { source: '/opportunities/Grants', destination: '/opportunities/grants', permanent: true },
    ];
  },
  turbopack: {
    root: process.cwd(),
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
