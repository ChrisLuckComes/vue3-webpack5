const presets = [
  [
    "@babel/preset-env",
    {
      useBuiltIns: "usage", // 这里配置usage 会自动根据你使用的方法以及你配置的浏览器支持版本引入对于的方法。
      corejs: "3", // 指定 corejs 版本
      targets: "last 2 version,> 1%,not dead",
    },
  ],
  [
    "@babel/preset-typescript", // 引用Typescript插件
    {
      isTSX: true, // 必须设置，否者编译tsx时会报错
      allowNamespaces: true,
      allExtensions: true, // 必须设置，否者编译.vue 文件中ts 代码会报错
    },
  ],
];

const plugins = [];

module.exports = {
  plugins,
  presets,
};
