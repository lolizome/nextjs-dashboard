import type { NextConfig } from 'next';

module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true // triggers 308
      }
    ]
  }
};

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
