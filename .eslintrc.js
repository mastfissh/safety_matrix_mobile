// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  "overrides": [
    {
      "files": [
        "__mocks__/**/*",
        "__tests__/**/*"
      ],
      "env": {
        "jest": true
      }
    }
  ]
};
