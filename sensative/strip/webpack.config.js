const path = require("path");

module.exports = {
    mode: "production",
    entry: "./index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "."),
        library: "driver",
    },
    resolve: {
        // The following items are used by example code which is present in the strips lora translator open source package,
        // there should be no reference in code used by this decoder.
        fallback: {
           browser: false,
           dns: false,
           process: false,
        }
    },
};
