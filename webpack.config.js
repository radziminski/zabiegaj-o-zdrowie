const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })

        
    ],
    module: {
        rules: [
            // Javascript bundling
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },

            // CSS loader 
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:['style-loader','css-loader']
            },

            // SASS Loader
            {
                test: /\.s[ac]ss$/i,
                exclude: /node_modules/,
                use: [
                  // Creates `style` nodes from JS strings
                  'style-loader',
                  // Translates CSS into CommonJS
                  'css-loader',
                  // Compiles Sass to CSS
                  'sass-loader',
                ],
            },

            // // Small Images loader - converts them to base64 string in bundle.js
            // {
            //     test: /\.(jpe?g|png|gif|svg|ico)$/i,
            //     use: [{
            //         loader: 'url-loader',
            //         options: {
            //             limit: 8192, // in bytes
            //             name: '[name].[ext]',
            //             esModule: false,
            //         }
            //     }]
            // },

            // Images loader
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: './data',
                        esModule: false,
                    }
                }]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: ['img:src', 'link:href']
                    }
                }
            }
        ]
    }
}