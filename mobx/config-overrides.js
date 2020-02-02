/* config-overrides.js */
const { override, fixBabelImports, disableEsLint, addLessLoader, addDecoratorsLegacy, addWebpackAlias, overrideDevServer } = require('customize-cra');
const path = require("path");
process.env.GENERATE_SOURCEMAP = "false";
module.exports = {
    webpack: override(

        addDecoratorsLegacy(),
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        // disable eslint in webpack
        disableEsLint(),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { "@primary-color": "#1890ff" },
            localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
        }), addWebpackAlias({
            ["@"]: path.resolve(__dirname, "src/")
        }),
    )
}

