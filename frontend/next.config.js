const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass')
const withLess = require('@zeit/next-less')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
})
const withImages = require('next-images')
const lessToJS = require('less-vars-to-js')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto');

const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './assert/styles/antd-custom.less'), 'utf8')
)

const nextConfig = {
    poweredByHeader: false,
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback);
                    } else {
                        callback();
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ];
    
            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            });
        }
        return config;
    },
};

module.exports = withPlugins(
    [
        [
            withLess,
            {
                lessLoaderOptions: {
                    javascriptEnabled: true,
                    modifyVars: themeVariables, // make your antd custom effective
                },
            }
        ],
        [
            withSass,
            {
                cssModules: true,
                cssLoaderOptions: {
                    importLoaders: 1,
                    localIdentName: '[path]___[local]___[hash:base64:5]',
                    getLocalIdent: (loaderContext, localIdentName, localName, options) => {
                        const fileName = path.basename(loaderContext.resourcePath)
                        if(fileName.indexOf('global.scss') !== -1){
                            return localName
                        }else{
                            const name = fileName.replace(/\.[^/.]+$/, "")
                            const className = `${name}__${localName}`

                            const hash = crypto.createHash('md5');
                            hash.update(className);
                            let hashDigest = hash.digest("base64").substr(0, 5)
                            hashDigest = hashDigest.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
                            
                            return process.env.NODE_ENV == "production" ? `${hashDigest}` : `${className}`
                        }
                    },
                },
            },
        ],
        [withBundleAnalyzer],
        [withImages],
    ],
    nextConfig,
);