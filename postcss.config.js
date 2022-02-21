module.exports = (ctx) => ({
    plugins: {
        'postcss-preset-env': !ctx.options.isDev ? {
            browsers: [
                "Chrome >= 52",
                "FireFox >= 44",
                "Safari >= 7",
                "Explorer 11",
                "last 4 Edge versions"
            ]
        } : false,
        'autoprefixer': ctx.options.isDev ? false : {}
    }
})