module.exports = {
    devServer: {
        port: 8080,
        proxy: {
            '/Api': {
                target: "http://xkd.lethink.net/",
                changeOrigin: true
            }
        }
    }
}