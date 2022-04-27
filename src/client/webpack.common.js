const path = require('path')


module.exports = {
    entry: {
        //make sure to name every file and where it is, like below
        Start_Alpine: './src/client/scripts/Start_Alpine.js',
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