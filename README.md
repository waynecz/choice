# Choice

> 你只需要码代码就行了

1. 安装依赖`npm install`
2. 开始开发`npm start` => 请全局gulp@4版本 `npm install gulpjs/gulp#4.0 -g`
3. 上线前打包`gulp p`
4. 部署上线, 建议使用[pm2](https://github.com/Unitech/pm2)管理进程, 附[pm2教程](https://segmentfault.com/a/1190000002539204)

    ```
    npm install -g pm2 // 全局安装pm2, 用来管理node进程

    pm2 start pm2.json // 非pm2 node ./bin/www

    ```
+ Choice 可以:
  + sass编译、autoprefixer
  + 监听服务端文件改动自动刷新页面, 监听静态资源自动刷新资源
  + 自动更改时间戳

## 目录及注意

- 模板引擎用的 [atrTemplate](https://github.com/aui/art-template)
- 页面头部底部等公共区域在 `/views/control/*.html` 里面，`/views/control/meta.html` 是页面信息等
- 首页 关于我们等具体页面 `/views/screen/*.html` 里面
- scss 样式在 `/src/sass` 里，`style-output.scss` 是入口文件
- 祝开发愉快 😬

###适合用来：
静态官网等，其实就是不适合用来开发比较大的web应用

基本没注释