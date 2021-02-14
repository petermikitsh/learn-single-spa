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
    devServer: {
      ...defaultConfig.devServer,
      https: Boolean(process.env.HTTPS),
    },
    output: {
      ...defaultConfig.output,
      ...(!isLocal &
        {
          filename: `${
            defaultConfig.output.filename.split(".js")[0]
          }.[contenthash].js`,
        }),
    },
    plugins: [
      ...defaultConfig.plugins,
      new HtmlWebpackPlugin({
        inject: false,
        // In local dev, WDS will serve index.html in place of 404
        // in GitHub Pages, use 404.html as a catch-all
        filename: isLocal ? "index.html" : "404.html",
        template: "src/index.ejs",
        templateParameters: {
          isLocal,
          orgName,
          FEATURE_APP_DATA: process.env.FEATURE_APP_DATA,
        },
      }),
    ],
    stats: "errors-warnings",
  };

  return final;
};
