module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/common/common.scss";\n@import "@/common/mixin.scss";`,
      },
    },
  },
};
