module.exports = {
  files: ["**/*.ts", "**/*.html"],
  formats: [
    {
      name: "stylish",
      output: "console"
    },
    {
      name: "json",
      output: "file",
      path: "reports/eslint-result.json"
    }
  ],
  eslintConfig: {}
};