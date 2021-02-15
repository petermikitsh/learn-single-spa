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
2. In the CLI, select apps to run. Import maps for the selected apps will point to your local webpack servers. All remaining apps will use staging import maps.
3. Go to https://0.0.0.0:9000/

#### Change import maps

Select environment import maps via `?env=stg` or `?env=prod`.

#### Servers

| Hostname     | Description           | Path                   |
| ------------ | --------------------- | ---------------------- |
| 0.0.0.0:9000 | Root App              | \*\*                   |
| 0.0.0.0:9001 | App1 (React App)      | /learn-single-spa/app1 |
| 0.0.0.0:9002 | App2 (Angular 11 App) | /learn-single-spa/app2 |
| 0.0.0.0:9003 | App3 (React App)      | /learn-single-spa      |
| 0.0.0.0:9004 | Util4 (Plain JS)      | N/A                    |

Each microfrontend server only serves its bundle.

## Releases

Releases are pushed to the `gh-pages` branch. In this example project, `gh-pages` is analogous to a CDN.

```
yarn run cicd
```

## Deployments

Import maps are defined on a per-enviornment basis, e.g: `importmap.stg.json` and `importmap.prod.json`, allowing apps to be deployed asynchronously. Which import map to use is computed at runtime, with highest to lowest precendence:

- Query parameter `env`
- Host inspection

1. Update the `packages/imports-maps/importmap.{env}.json` with versions to use.
2. Run `yarn deploy`. **All** import map files will be deployed.

## Learnings

- When launching a new feature app, update the import map first before deploying the root config. Otherwise, your root config will reference an app that cannot be resolved via import map.
- Single SPA's utility module concept selects the module version at runtime via import maps. Because selection is at runtime and not compile time, there is no way to reliably type a `System.import` call. Typings are a compile time construct. See https://github.com/single-spa/single-spa.js.org/issues/361. The best workaround might be to use ES Modules (which are compile time) instead of browser modules (which are runtime).
