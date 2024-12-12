import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        ...(process.env.CODESPACE_NAME ? [
          `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}`
        ] : [])
      ].filter(Boolean),
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'x-forwarded-host',
          value: process.env.CODESPACE_NAME ? 
            `${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}` : 
            'localhost:3000',
        },
      ],
    },
  ],
};

export default nextConfig;
