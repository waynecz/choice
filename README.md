# Choice

> 你只需要码代码就行了

1. 安装依赖`npm install`
2. 开始开发`gulp dev` => 请全局gulp@4版本
3. 上线前打包`gulp p`
4. 部署上线, 建议使用[pm2](https://github.com/Unitech/pm2)管理进程, 附[pm2教程](https://segmentfault.com/a/1190000002539204)

    ```
    npm install -g pm2 // 全局安装pm2, 用来管理node进程

    pm2 start pm2.json // 非pm2 node ./bin/www

    ```
+ Choice 可以:
  + sass编译、autoprefixer
  + 图片压缩 `gulp img` (暂不可用)
  + 雪碧图生成 `gulp sp` (生成的雪碧图移动端会有点问题)
  + 监听服务文件改动,监听静态资源改动
  + 你再也不用摁刷新键啦！！！！
+ 考虑加入🤔
  + js打包(目前看来不需要)


###适合用来：😬
静态官网等，其实就是不适合用来开发比较大的web应用

基本没注释