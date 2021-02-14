#!/usr/bin/env node

const { spawn } = require('child_process');
const prompts = require('prompts');
const pidTree = require('pidtree');

const portMaps = {
  app1: 9001,
  app2: 9002,
  app3: 9003,
};

(async () => {
  const { featureApp } = await prompts([
    {
      type: 'select',
      name: 'featureApp',
      message: 'Choose a Feature App to work on:',
      choices: [
        { title: 'All (not recommended)', value: 'all' },
        { title: `app1 (Port ${portMaps.app1})`, value: 'app1' },
        { title: `app2 (Port ${portMaps.app2})`, value: 'app2' },
        { title: `app3 (Port ${portMaps.app3})`, value: 'app3' },
      ],
    },
  ]);

  if (!featureApp) {
    process.exit();
  }

  const appToGlob = {
    all: '**',
    app1: '*/{app1,root-config}',
    app2: '*/{app2,root-config}',
    app3: '*/{app3,root-config}',
  };

  if (!process.env.HTTPS) {
    console.log('Live Server at http://0.0.0.0:9000/');
  }

  const startProcess = spawn(
    'lerna',
    [
      'run',
      'start',
      '--scope',
      `'${appToGlob[featureApp]}'`,
      '--stream',
      '--parallel',
    ],
    {
      stdio: 'inherit',
      env: {
        ...process.env,
        FEATURE_APP_NAME: featureApp,
        FEATURE_APP_PORT: portMaps[featureApp],
      },
    },
  );

  setTimeout(async () => {
    const ids = await pidTree(startProcess.pid);
    process.on('SIGINT', async () => {
      spawn('kill', ['-9'].concat(ids));
    });
  }, 2000);
})();
