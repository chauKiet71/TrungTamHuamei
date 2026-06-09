/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    // If running on Vercel and no external BACKEND_URL is set, we bypass rewrites to use same-domain serverless API
    if (process.env.VERCEL === '1' && !process.env.BACKEND_URL) {
      return [];
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
