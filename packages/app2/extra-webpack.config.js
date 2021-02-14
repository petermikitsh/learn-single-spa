const singleSpaAngularWebpack = require("single-spa-angular/lib/webpack")
  .default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  const final = {
    ...singleSpaWebpackConfig,
    devServer: {
      ...singleSpaWebpackConfig.devServer,
      https: Boolean(process.env.HTTPS),
    },
    entry: {
      "exampleorg-app2": singleSpaWebpackConfig.entry.main,
    },
    stats: 'errors-warnings',
  };

  // Feel free to modify this webpack config however you'd like to
  return final;
};
