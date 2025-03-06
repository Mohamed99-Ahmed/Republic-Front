import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "https://ik.imagekit.io/MohamedAhmed/Rubublic%20Imgs/offers/elngdaa.png?updatedAt=1740589460139"
  // /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
        pathname: "/MohamedAhmed/Rubublic%20Imgs/**", // Use `pathname` instead of `path`
      },
    ],
  },
};

export default nextConfig;
