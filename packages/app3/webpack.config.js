const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

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
    stats: 'errors-warnings',
  };

  return final;
};
