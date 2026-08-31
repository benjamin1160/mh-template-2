import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 only serves qualities on this allowlist; 90 is for the hero photo.
    qualities: [75, 90],
  },
  experimental: {
    // Lets listing-card artwork morph into the detail-page hero on navigation.
    viewTransition: true,
  },
};

export default nextConfig;
