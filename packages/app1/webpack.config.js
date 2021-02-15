const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const debug = require("debug")("app1");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "exampleorg",
    projectName: "app1",
    webpackConfigEnv,
    argv,
  });

  const final = {
    ...defaultConfig,
    devServer: {
      ...defaultConfig.devServer,
      port: "9001",
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
