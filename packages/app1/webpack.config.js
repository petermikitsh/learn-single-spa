const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

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
    },
    externals: [/^@exampleorg\//],
  };

  return final;
};
