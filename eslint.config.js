const playwright = require("eslint-plugin-playwright");

module.exports = [
    {
        ...playwright.configs["flat/recomended"],
        files: ["tests/**"]
    },
    {
        files: ["tests/**"],
        rules:{
            "playwright/no-wait-for-timeout" : "error", //dissalow waitForTimeout
            "playwright/no commented-out-tests": "error", //dissalow commented out tests
            "playwright/expect-expect": "error", //enforce assertion to be made in a test body
            "playwright/missing-playwright-await": "error", //enforce Playwright APIs to be await
            "playwright/no-focused-tests": "error", //dissalow usage of .only annotation
            "playwright/no-skipped-tests": "error", //dissalow usage of the .skip annotation
        },
    },
]
