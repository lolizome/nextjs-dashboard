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
  /* config options here */
};

export default nextConfig;
