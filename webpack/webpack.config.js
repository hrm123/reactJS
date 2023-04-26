var path = require("path");

module.exports = {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        path: path.resolve(__dirname, 'www/builds'),
        filename: './bundle.js',
        publicPath: "/builds/",
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src')
            }
        ]
    }

}