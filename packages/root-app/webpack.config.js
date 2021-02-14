const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "exampleorg";
  const isLocal = webpackConfigEnv && webpackConfigEnv.isLocal;
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });

  const final = {
    ...defaultConfig,
    output: {
      ...defaultConfig.output,
      ...(!isLocal & {
        filename: `${
          defaultConfig.output.filename.split(".js")[0]
        }.[contenthash].js`,
      }),
    },
    plugins: [
      ...defaultConfig.plugins,
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal,
          orgName,
        },
      }),
    ],
  };

  return final;
};
