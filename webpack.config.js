var path = require("path");

const plugins = [
    // class { handleClick = () => { } }
    require.resolve('babel-plugin-transform-class-properties'),
    // The following two plugins use Object.assign directly, instead of Babel's
    // extends helper. Note that this assumes `Object.assign` is available.
    // { ...todo, completed: true }
    [require.resolve('babel-plugin-transform-object-rest-spread'), {
        useBuiltIns: true
    }],
    // Transforms JSX
    [require.resolve('babel-plugin-transform-react-jsx'), {
        useBuiltIns: true
    }],
    // Polyfills the runtime needed for async/await and generators
    [require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true,
        // Resolve the Babel runtime relative to the config.
        moduleName: path.dirname(require.resolve('babel-runtime/package'))
    }]
];


module.exports = {
    entry: {
        indexView: "./src/index.js",
        previewView: "./src/preview.js",
        showDataView: "./src/showData.js",
        reFormView: "./src/reForm.js"
    },
    output: {
        path: path.resolve(__dirname + '/dist' ),
        publicPath: "/dist/",
        filename: "[name].js",
        chunkFilename: "lazy/[name].js"
    },
    devServer: {
        inline: true,
        port: 7777
    },
    resolve: {
        alias: {
            'src_path': path.resolve(__dirname + '/src' )
        }
    },
    externals: {
        'react': 'window.React',
        'react-dom':'window.ReactDOM',
        'wangEditor':'window.wangEditor',
        'moment':'window.moment'
    },
    module: {
        loaders: [
            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['latest', 'react'],
                    plugins:plugins.concat([
                        // function* () { yield 42; yield 43; }
                        [require.resolve('babel-plugin-transform-regenerator'), {
                            // Async functions are converted to generators by babel-preset-latest
                            async: false
                        }],
                    ])
                }
            }
        ]
    }
};