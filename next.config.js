/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async headers() {
    const noIndex = "noindex, nofollow, nosnippet";

    return [
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: noIndex }],
      },
      {
        source: "/login",
        headers: [{ key: "X-Robots-Tag", value: noIndex }],
      },
      {
        source: "/registro",
        headers: [{ key: "X-Robots-Tag", value: noIndex }],
      },
    ];
  },
};

module.exports = nextConfig;