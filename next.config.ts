/** @type {import('next').NextConfig} */
const nextConfig = {
  // 关键：允许在有 ESLint 错误的情况下完成构建
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 关键：允许在有 TypeScript 错误的情况下完成构建
  typescript: {
    ignoreBuildErrors: true,
  },
  // 如果你的代码中有未使用的图片或资源，可以加上这个
  images: {
    unoptimized: true,
  }
};

export default nextConfig;