,
  "env": {
    "development": {
      "plugins": [["react-transform", {
        "transforms": [{
          "transform": "react-transform-hmr",
          "imports": ["react"],
          "locals": ["module"]
        }]
      }]]
    }
  }