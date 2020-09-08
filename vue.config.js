module.exports = {
    devServer: {
        proxy: {
            '/Api': {
                target: "http://xkd.lethink.net/",
                changeOrigin: true
            }
        }
    }
}