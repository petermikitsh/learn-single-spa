const singleSpaAngularWebpack = require("single-spa-angular/lib/webpack")
  .default;
const debug = require("debug")("app2");

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  const final = {
    ...singleSpaWebpackConfig,
    devServer: {
      ...singleSpaWebpackConfig.devServer,
      https: Boolean(process.env.HTTPS),
    },
    stats: "errors-warnings",
  };

  debug(final);

  // Feel free to modify this webpack config however you'd like to
  return final;
};
