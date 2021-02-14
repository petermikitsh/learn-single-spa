# learn-single-spa

Experiment with Single SPA

## Getting Started

Pre-req's:

- For live development, visit `chrome://flags/#allow-insecure-localhost` and Enable.

- ```sh
  nvm use
  yarn install
  ```

## Live Development (`yarn start:ssl`)

1. Go to live site: https://petermikitsh.github.io/learn-single-spa
2. In the console: `window.ENABLE_DEV_MODE()`
3. Select import map panel, select app to develop. For URL, enter port number and select "Apply Override".
4. Refresh the webpage.

## Local Development (`yarn start`)

Only ever access host http://0.0.0.0:9000. This URL serves all client-side routes.

| Hostname     | Description           | Path                   |
|--------------|-----------------------|------------------------|
| 0.0.0.0:9000 | Root App              | **                     |
| 0.0.0.0:9001 | App1 (React App)      | /learn-single-spa/app1 |
| 0.0.0.0:9002 | App2 (Angular 11 App) | /learn-single-spa/app2 |
| 0.0.0.0:9003 | App3 (React App)      | /learn-single-spa      |

Each microfrontend server only serves its bundle.

## Releases

In a local environment, a canary release will be pushed to the gh-pages branch.

```
yarn run cicd
```

## Deployments

1. Update the `packages/imports-maps/importmap.json` with versions to use.
2. Run `yarn deploy`

## Learnings

- When launching a new feature app, update the import map first before deploying the root config. Otherwise, your root config will reference an app that cannot be resolved via import map.
