const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
    {
        name: "web",
        target: "web",
        devServer: {
            port: 8000,
            open: true
        },
        entry: './src/web.ts',
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader'
                    ]
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'web.bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        plugins: [new HtmlWebpackPlugin({
            template: './index.html'
        })],
        mode: 'development'
    },
    {
        name: "cli",
        target: "node",
        entry: './src/cli.ts',
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }
            ]
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/'),
            },
            extensions: ['.ts', '.js']
        },
        output: {
            filename: 'cli.bundle.js',
            path: path.resolve(__dirname, 'dist'),
        },
        mode: 'development'
    },
]
