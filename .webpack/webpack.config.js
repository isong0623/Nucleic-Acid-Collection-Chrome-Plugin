const path      = require('path');
const webpack   = require('webpack');
const crypto    = require('crypto-browserify');
const pluginDir = "D:\\My_Developments\\Dreaming\\flutter_tests\\hscj\\app\\local\\plugin\\speak\\";

const TerserPlugin      = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    mode: 'production',
    entry:{
        background:path.resolve(pluginDir,"./.webpack/chunk-in/background.js"),
        content   :path.resolve(pluginDir,"./.webpack/chunk-in/content.js"   ),
        options   :path.resolve(pluginDir,"./.webpack/chunk-in/options.js"   )
    },
    output: {
        path: path.resolve(pluginDir, './.webpack/chunk-out/'),
        filename: 'bundle-[id]-[name].js'
    },
    plugins: [
        {
            apply: (compiler) => {
                compiler.hooks.done.tap('DonePlugin', (stats) => {
                    console.log('Compile is done !')
                    setTimeout(() => {
                        process.exit(0)
                    })
                });
            }
        }
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({
            //剥离注释功能
            extractComments: true,
            terserOptions:{
                compress:{
                    collapse_vars:false,
                    dead_code:false,
                    drop_debugger:false,
                    directives:false,
                    inline:false,
                    join_vars:false
                },
            },
        })],
    },
    performance: {   //  就是为了加大文件允许体积，提升报错门栏。

        hints: "warning", // 枚举

        maxAssetSize: 5000000, // 整数类型（以字节为单位）

        maxEntrypointSize: 5000000, // 整数类型（以字节为单位）

        assetFilter: function(assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    watch:true ,
};