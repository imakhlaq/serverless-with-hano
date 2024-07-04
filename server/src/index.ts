import App from "./app";

function main() {
  const app = new App({ port: 3005, contextPath: "/api" });

  app.start();
}

main();
