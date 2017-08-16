const path = require('path');
const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        files: [
            './node_modules/phantomjs-polyfill-find/find-polyfill.js',
            './node_modules/phantomjs-polyfill-includes/includes-polyfill.js',
            './node_modules/phantomjs-polyfill-string-includes/index.js',
            './node_modules/babel-polyfill/dist/polyfill.js',
            'client/**/*.spec.js'
        ],
        preprocessors: {
            'client/**/*.spec.js': 'webpack',
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel',
                        exclude: /node_modules/
                    },
                    // {
                    //     test: /\.js$|^\.spec.js$/,
                    //     loader: 'istanbul-instrumenter-loader',
                    //     include: path.join(__dirname, '/client'),
                    //     exclude: /node_modules/
                    // },
                    { test: /\.scss$/, loader: 'ignore' },
                    { test: /\.css$/, loader: 'ignore' },
                    { test: /\.png$/, loader: 'ignore' },
                    { test: /\.json$/, loader: 'json' }
                ]
            },
            externals: {
                cheerio: 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true
            },
            resolve: {
                root: [path.resolve('./client')]
            },
            plugins: [
                new webpack.optimize.OccurenceOrderPlugin(),
                new webpack.optimize.DedupePlugin(),
                new webpack.NoErrorsPlugin()
            ]
        },
        webpackServer: {
            noInfo: true
        },
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        reporters: ['progress', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['text-summary'],
            fixWebpackSourcePaths: true
        }
    });
};
