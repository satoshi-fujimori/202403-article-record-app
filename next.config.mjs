/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "qiita-user-contents.imgix.net",
      },
    ],
  },
};

export default nextConfig;
