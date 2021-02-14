#!/usr/bin/env node

const { spawn } = require("child_process");
const prompts = require("prompts");
const pidTree = require("pidtree");

const portMaps = {
  app1: 9001,
  app2: 9002,
  app3: 9003,
};

(async () => {
  const { featureApps } = await prompts([
    {
      type: "multiselect",
      name: "featureApps",
      message: "Choose Feature App(s) to work on:",
      instructions: false,
      choices: [
        { title: `app1 (Port ${portMaps.app1})`, value: "app1" },
        { title: `app2 (Port ${portMaps.app2})`, value: "app2" },
        { title: `app3 (Port ${portMaps.app3})`, value: "app3" },
      ],
    },
  ]);

  if (!featureApps?.length) {
    console.log("🚨 No feature app(s) selected");
    process.exit();
  }

  if (!process.env.HTTPS) {
    console.log("Live Server at http://0.0.0.0:9000/");
  }

  const startProcess = spawn(
    "lerna",
    [
      "run",
      "start",
      "--scope",
      `'*/{root-config,${featureApps.join(",")}}'`,
      "--stream",
      "--parallel",
    ],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        FEATURE_APP_DATA: JSON.stringify(
          featureApps.reduce((result, currFeatureApp) => {
            result[currFeatureApp] = portMaps[currFeatureApp];
            return result;
          }, {})
        ),
      },
    }
  );

  setTimeout(async () => {
    const ids = await pidTree(startProcess.pid);
    process.on("SIGINT", async () => {
      spawn("kill", ["-9"].concat(ids));
    });
  }, 2000);
})();
