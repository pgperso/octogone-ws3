const config = {
  plugins: [
    "@tailwindcss/postcss",
    // Minification CSS en production
    ...(process.env.NODE_ENV === 'production' 
      ? [
          ['cssnano', {
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true,
              minifyFontValues: true,
              minifySelectors: true,
            }]
          }]
        ] 
      : []
    ),
  ],
};

export default config;
