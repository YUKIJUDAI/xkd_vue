module.exports = {
    outputDir: "./dist/html-xiaokedou/pubilc",
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