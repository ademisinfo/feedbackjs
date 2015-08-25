var gulp = require('gulp-help')(require('gulp'));
var gutil = require('gulp-util');
var webpack = require('webpack');

/*
 * Tasks configuration
 */
var config = {

    // Common
    common: {
        context: __dirname + '/src',
        module: {
            loaders: [
                { test: /\.jsx?$/, loader: 'babel' },
                { test: /\.json?$/, loader: 'json' }
            ]
        },
        entry: './AdemisFeedback.jsx'
    },

    // Development
    development: {
        devtool: 'sourcemap',
        debug: true,
        output: {
            libraryTarget: 'var',
            library: 'AdemisFeedback',
            path: __dirname + '/dist',
            filename: 'feedback.js'
        }
    },

    // Production
    production: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    // This has effect on the react lib size
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ],
        output: {
            libraryTarget: 'var',
            library: 'AdemisFeedback',
            path: __dirname + '/dist',
            filename: 'feedback.min.js'
        }
    }

};

for (var option in config.common) {
    if (! config.development.hasOwnProperty(option)) {
        config.development[option] = config.common[option];
    }

    if (! config.production.hasOwnProperty(option)) {
        config.production[option] = config.common[option];
    }
}

/*
 * Webpack compilers
 */
var compiler = {
    production: webpack(config.production),
    development: webpack(config.development)
};

/*
 * Production task
 */
gulp.task('webpack:production', 'Bundle the application for production environment', function(callback) {
    compiler.production.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:production', err);
        }

        gutil.log('[webpack:production]', stats.toString({ colors: true }));

        callback();
    });
});

/*
 * Development task
 */
gulp.task('webpack:development', 'Bundle the application for development environment', function(callback) {
    compiler.development.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack:development', err);
        }

        gutil.log('[webpack:development]', stats.toString({ colors: true }));

        callback();
    });
});

/*
 * Watch for development
 */
gulp.task('watch', 'Run webpack:development and watch for file changes', ['webpack:development'], function() {
    gulp.watch(['src/**/*'], ['webpack:development']);
});

/*
 * Alias for production build
 */
gulp.task('build', 'Alias of webpack:production', ['webpack:production']);

/*
 * Default: watch
 */
gulp.task('default', 'Default task: watch', ['watch']);
