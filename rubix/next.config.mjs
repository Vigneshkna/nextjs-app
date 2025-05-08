/** @type {import('next').NextConfig} */
import { withContentlayer } from 'next-contentlayer2';
const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return withContentlayer(config);
  },
};