import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'Qooi',
  favicon: 'https://code-1257508274.cos.ap-guangzhou.myqcloud.com/logo.svg',
  logo: 'https://code-1257508274.cos.ap-guangzhou.myqcloud.com/logo.svg',
  outputPath: 'docs-dist',
  locales: [
    ['zh-CN', '中文'],
    ['en-US', 'English'],
  ],
  mode: 'site',
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: false,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName: [],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: false,
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/qooi/' : '/',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/oneQiu/Qoo',
    },
  ],
  // more config: https://d.umijs.org/config
});
