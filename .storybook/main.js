const path = require('path');

module.exports = {
  stories: ['../src/stories/**/*.stories.(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/preset-create-react-app',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
      },
    },
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\,css&/,
      use: [
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            plugins: [
              require('tailwindcss'),
              require('autoprefixer')
            ]
          }
        }
      ],
      include: path.resolve(__dirname, '../'),
    })
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': path.resolve(__dirname, '../src/'),
    };
    return config;
  },
};
