#!/usr/bin/env node

const { spawn } = require('child_process');
const prompts = require('prompts');
const pidTree = require('pidtree');

(async () => {
  const { featureApp } = await prompts([
    {
      type: 'select',
      name: 'featureApp',
      message: 'Choose a Feature App to work on:',
      choices: [
        { title: 'All (not recommended)', value: 'all' },
        { title: 'app1 (Port 9001)', value: 'app1' },
        { title: 'app2 (Port 9002)', value: 'app2' },
        { title: 'app3 (Port 9003)', value: 'app3' },
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
