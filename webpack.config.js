var path = require('path');

module.exports = {
    entry:  {
        app: path.resolve('./') + '/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
};