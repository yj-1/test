module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/mixin.scss";\n@import "@/common/theme.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
