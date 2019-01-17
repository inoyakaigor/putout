"use strict";

/*eslint quotes: ["error", "double"]*/
module.exports = {
    "env": {
        "es6": true,
        "node": true,
    },
    "parserOptions": {
        "ecmaVersion": 2019,
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single", {
            "allowTemplateLiterals": true
        }],
        "semi": "error",
        "object-shorthand": "error",
        "prefer-arrow-callback": "error",
        "no-use-before-define": 0,
        "no-multiple-empty-lines": [
            "error", {
                "max": 1
            }]
    },
    "extends": [
        "eslint:recommended"
    ],
};
