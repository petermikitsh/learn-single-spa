const singleSpaAngularWebpack = require("single-spa-angular/lib/webpack")
  .default;

module.exports = (config, options) => {
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  const final = {
    ...singleSpaWebpackConfig,
    entry: {
      "exampleorg-app2": singleSpaWebpackConfig.entry.main,
    },
  };

  // Feel free to modify this webpack config however you'd like to
  return final;
};
