const path = require('path')

module.exports = {
    entry: {
        client: './src/client/client.ts', // threejs
        back_animation: './src/client/back_animation.js' // pixijs
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, '../../dist/client'),
    },

}