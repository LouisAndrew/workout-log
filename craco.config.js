// eslint-disable-next-line import/no-extraneous-dependencies
const CracoAlias = require('craco-alias');

/* eslint-disable global-require */
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.extend.json',
      }
    }
  ],
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('postcss-nesting')
      ],
    },
  },
};
