import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'is1-ssl.mzstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
    /**
     * Time in seconds to cache optimized images.
     */
    minimumCacheTTL: 86400, // 24 hours
  },
};

export default nextConfig;
