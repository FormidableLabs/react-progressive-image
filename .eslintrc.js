module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true,
        "jest": true
    },
    "globals": {
      "React$Element": true,
    },
    "extends": "formidable/configurations/es6-react",
    "plugins": [
        "babel",
        "react",
        "flowtype"
    ],
    "rules": {
        // https://github.com/babel/eslint-plugin-babel/issues/12
        "no-invalid-this": [
          "off"
        ],
        "quotes": [
          "error",
          "single",
          { "allowTemplateLiterals": true }
        ],
        "react/sort-comp": [
          "off"
        ]
    }
};
