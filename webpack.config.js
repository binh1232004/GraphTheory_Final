const path = require("path");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js"
    },
    devServer: {
        static: path.join(__dirname, "web"),
        port: 9000,
    },
    module: {
        rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
        ]
    }
};

