const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://learn-web-test.vercel.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
