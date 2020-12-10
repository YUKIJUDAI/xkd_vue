module.exports = {
    outputDir: "./dist/html-xiaokedou/pubilc",
    devServer: {
        port: 8083,
        proxy: {
            '/Api': {
                target: "/Api",
                changeOrigin: true
            }
        }
    }
}