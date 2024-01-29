const DotenvWebpackPlugin = require('dotenv-webpack');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // Add dotenv-webpack plugin
      webpackConfig.plugins.push(new DotenvWebpackPlugin());
      return webpackConfig;
    },
  },
};
