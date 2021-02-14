# learn-single-spa

Experiment with Single SPA

## Getting Started

```
yarn install
yarn start
```

## Servers

| Hostname     | Description           |
| ------------ | --------------------- |
| 0.0.0.0:9000 | Root App              |
| 0.0.0.0:8000 | App1 (React App)      |
| 0.0.0.0:4200 | App2 (Angular 11 App) |

## Releases

In a local environment, a canary release will be pushed to the gh-pages branch.

```
yarn run cicd
```

## Deployments

1. Update the `packages/imports-maps/importmap.json` with versions to use.
2. Run `yarn deploy`
