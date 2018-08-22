const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({})
    ]
};