import { registerApplication, start } from "single-spa";

// registerApplication({
//   name: "@single-spa/welcome",
//   app: () =>
//     System.import(
//       "https://unpkg.com/single-spa-welcome/dist/single-spa-welcome.js"
//     ),
//   activeWhen: ["/"],
// });

registerApplication({
  name: "@exampleorg/app1",
  app: () => System.import("@exampleorg/app1"),
  activeWhen: ["/learn-single-spa/app1"],
});

registerApplication({
  name: "@exampleorg/app2",
  app: () => System.import("@exampleorg/app2"),
  activeWhen: ["/learn-single-spa/app2"],
});

start({
  urlRerouteOnly: true,
});
