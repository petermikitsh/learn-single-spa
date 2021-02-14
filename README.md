# learn-single-spa

Experiment with Single SPA

## Getting Started

```
yarn install
yarn start
```

## Servers

| Hostname     | Description           | Path                   |
|--------------|-----------------------|------------------------|
| 0.0.0.0:9000 | Root App              | **                     |
| 0.0.0.0:9001 | App1 (React App)      | /learn-single-spa/app1 |
| 0.0.0.0:9002 | App2 (Angular 11 App) | /learn-single-spa/app2 |
| 0.0.0.0:9003 | App3 (React App)      | /learn-single-spa      |

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
