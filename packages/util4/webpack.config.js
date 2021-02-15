const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "exampleorg",
    projectName: "util4",
    webpackConfigEnv,
    argv,
  });

  const final = {
    ...defaultConfig,
    devServer: {
      ...defaultConfig.devServer,
      port: "9004",
      https: Boolean(process.env.HTTPS),
    },
    output: {
      ...defaultConfig.output,
      filename: "main.js",
    },
    stats: "errors-warnings",
  };

  return final;
};
