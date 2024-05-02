/* eslint-disable no-unused-vars */
/** @type {import('@types/webpack').Configuration} */
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootPackageJson = require("./package.json");
const isProduction = process.env.REACT_APP_ENVIRONMENT === "production";
module.exports = {
    mode: isProduction ? "production" : "development",
    entry: {
        main: ["./client/index.js"],
    },
    output: {
        path: isProduction ? path.resolve("build") : path.resolve("dev"),
        filename: "bundle.js",
    },
    externalsPresets: {
        web: true,
    },
    module: {
        rules: [
            {
                test: /\.m?js/,
                exclude: /server/,
                resolve: {
                    fullySpecified: false,
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|server)/,
                use: {
                    loader: "swc-loader",
                    options: {
                        module: {
                            type: "es6",
                            strict: false,
                            strictMode: false,
                            lazy: false,
                            noInterop: false,
                        },
                        minify: !!isProduction,
                        jsc: {
                            parser: {
                                syntax: "ecmascript",
                                jsx: true,
                                dynamicImport: true,
                                privateMethod: false,
                                functionBind: false,
                                exportDefaultFrom: true,
                                exportNamespaceFrom: false,
                                decorators: false,
                                decoratorsBeforeExport: false,
                                topLevelAwait: false,
                                importMeta: false,
                            },
                            transform: {
                                react: {
                                    pragma: "React.createElement",
                                    pragmaFrag: "React.Fragment",
                                    throwIfNamespace: true,
                                    development: process.env.REACT_APP_ENVIRONMENT !== "production",
                                    useBuiltins: false,
                                    runtime: "automatic",
                                },
                            },
                            target: "es2022",
                            loose: false,
                            externalHelpers: true,
                            // Requires v1.2.50 or upper and requires target to be es2016 or upper.
                            keepClassNames: !isProduction,
                        },
                    },
                },
            },
            {
                test: /\.(sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },

            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    plugins: [
        !isProduction && new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "client/index.html",
            favicon: "client/favicon.ico",
        }),
        new MiniCssExtractPlugin(),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.REACT_APP_ENVIRONMENT),
                REACT_APP_OIDC_CLIENT_ID: JSON.stringify(process.env.REACT_APP_OIDC_CLIENT_ID),
                REACT_APP_KEYCLOAK_URL: JSON.stringify(process.env.REACT_APP_KEYCLOAK_URL),
                REACT_APP_AUTH_REALM: JSON.stringify(process.env.REACT_APP_AUTH_REALM),
                REACT_APP_VERSION: JSON.stringify(rootPackageJson.version),
                REACT_APP_MONGODB_URI: JSON.stringify(process.env.REACT_APP_MONGODB_URI),
                REACT_APP_REDIS_PORT: JSON.stringify(process.env.REACT_APP_REDIS_PORT),
                REACT_APP_REDIS_HOST: JSON.stringify(process.env.REACT_APP_REDIS_HOST),
                REACT_APP_PINO_LOG_LEVEL: JSON.stringify(process.env.REACT_APP_PINO_LOG_LEVEL),
                REACT_APP_SERVICE_PORT: JSON.stringify(process.env.REACT_APP_SERVICE_PORT),
            },
        }),
    ].filter(Boolean),
    devtool: isProduction ? "source-map" : "cheap-module-source-map",
    performance: {
        hints: false,
    },
    resolve: {
        extensions: [".jsx", ".tsx", ".ts", ".graphql", ".gql", ".js", ".mjs", ".json", ".css"],
        fallback: {
            fs: false,
        },
    },
    stats: {
        colors: true,
        version: false,
        hash: true,
        timings: true,
        chunks: true,
        chunkModules: true,
    },
};
