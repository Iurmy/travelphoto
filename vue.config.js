var url = 'https://api.travelphotography.com.cn'
module.exports = {
    configureWebpack: config => {
        require('vux-loader').merge(config, {
            options: {},
            plugins: ['vux-ui']
        })
    },
    devServer: {
        proxy: {
            '/order': {
                target: url,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/order': '/order'
                }
            },
            '/photo': {
                target: url,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/photo': '/photo'
                }
            },
            '/base': {
                target: url,
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/base': '/base'
                }
            }
        }
    }
}