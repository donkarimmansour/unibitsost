/** @type {import('next').NextConfig} */
const nextConfig = {

    experimental: {
        serverComponentsExternalPackages: ['@prisma/client'],
        serverActions: true
      },

};

export default nextConfig;
 