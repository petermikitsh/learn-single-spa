const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const debug = require("debug")("app3");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "exampleorg",
    projectName: "app3",
    webpackConfigEnv,
    argv,
  });

  const final = {
    ...defaultConfig,
    devServer: {
      ...defaultConfig.devServer,
      port: "9003",
      https: Boolean(process.env.HTTPS),
    },
    externals: [/^@exampleorg\//],
    output: {
      ...defaultConfig.output,
      filename: "main.js",
    },
    stats: "errors-warnings",
  };

  debug(final);

  return final;
};
