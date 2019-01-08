module.exports = {
  env: {
    development: {
      sourceMaps: true,
      retainLines: true
    }
  },
  presets: [
    [
      "@vue/app",
      {
        polyfills: ["es6.promise", "es6.symbol"]
      }
    ]
  ]
};
