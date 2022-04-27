const path = require('path')
var fs = require('fs'),
    entries = fs.readdirSync('./src/client/scripts/').filter(function(file) {
        return file.match(/.*\.ts$/);

    });

module.exports = {
    entry: './src/client/scripts/main.js',
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