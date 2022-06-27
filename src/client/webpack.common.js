const path = require('path')


module.exports = {
    entry: {
        //make sure to name every file and where it is, like below
        Start_Alpine: './src/client/scripts/Start_Alpine.js',
        Balls_Animation: './src/client/scripts/Balls_Animation.js',
        Html_Include: './src/client/scripts/Html_Include.js',
        Experience: './src/client/scripts/experience.ts',
        map: './src/client/scripts/map.ts',
        modelviewer: './src/client/scripts/modelviewer.ts',
        projecthandler: './src/client/scripts/projecthandler.ts',
        projects:'./src/client/scripts/projects.ts'
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