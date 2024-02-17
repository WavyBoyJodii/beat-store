/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ajgslhsuanxjykabjzbu.supabase.co',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'files.stripe.com',
        port: '',
      },
    ],
  },
};

module.exports = nextConfig;
