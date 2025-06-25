/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
  compiler: {
    removeConsole: false,
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Tambah ini untuk handle dynamic pages
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
