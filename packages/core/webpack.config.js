const path = require('path');

module.exports = {
    context: __dirname,
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        // publicPath: '/dist',
        library: 'si/core',
        libraryTarget: "umd",
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
}