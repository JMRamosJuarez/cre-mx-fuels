module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.ios.tsx',
          '.android.ts',
          '.android.tsx',
          '.ts',
          '.tsx',
          '.js',
          '.jsx',
          '.json',
        ],
        alias: {
          '@theme': './src/theme',
          '@assets': './src/assets',
          '@localization': './src/localization',
          '@core': './src/core',
          '@fuels': './src/fuels',
        },
      },
    ],
  ],
};
