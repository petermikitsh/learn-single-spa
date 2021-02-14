# learn-single-spa

Experiment with Single SPA

## Getting Started

Pre-req's:

- For live development, visit `chrome://flags/#allow-insecure-localhost` and Enable.

- ```sh
  nvm use
  yarn install
  ```

## Two Development modes

- **Live Development**: Navigate to deployed server, and update feature app(s) to point to local servers
- **Local Development**: Traditional setup

### ⭐️ Live Development (`yarn start:https`)

1. Go to live site: https://petermikitsh.github.io/learn-single-spa
2. In the console: `window.ENABLE_DEV_MODE()`
3. In your terminal, select your feature app with `yarn start:https` (note the port number).
4. Select import map panel, select app to develop. For URL, enter port number and select "Apply Override".
5. Refresh the webpage.

### Local Development (`yarn start`)

1. Run `yarn start`
2. Go to https://0.0.0.0:9000/

#### Change import maps

Select environment import maps via `?env=stg` or `?env=prod`.

#### Servers

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
