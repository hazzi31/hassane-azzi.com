import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  // German temporarily disabled: send old /de URLs (with or without sub-path)
  // to /en. Redirects run before the next-intl middleware. Kept non-permanent
  // (307) so browsers don't cache it. Remove when 'de' is re-enabled.
  async redirects() {
    return [
      {
        source: '/de/:path*',
        destination: '/en',
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
