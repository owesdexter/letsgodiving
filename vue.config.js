module.exports = {
    css: {
        // loaderOptions: {
        //     scss: {
        //         additionalData: `@import "~@/assets/style/scss/all.scss";`  // "@/"" is an alias to src/
        //     },
        // }
    },

    devServer: {
        port: 8080,
        https: false,
    },
}

/*
module.exports = {
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080, // CHANGE YOUR PORT yHERE!
        https: true,
        hotOnly: false,
    },
}*/