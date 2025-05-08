/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer2';
import webpack from 'webpack';

const nextConfig = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

export default withContentlayer(nextConfig);