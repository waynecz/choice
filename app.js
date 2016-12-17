const express = require('express');
const path = require('path');
const logger = require('morgan'); // 请求打印
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const template = require('art-template');
const favicon = require('serve-favicon');
const gzip = require('compression');
const renderPage = require('./middleware/renderPage');

// 路由入口
const routes = require('./routes/index');

const app = express();

// 渲染引擎设置
template.config('extname', '.html');
template.config('cache', false);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', template.__express);
app.set('view engine', 'html');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 打印请求
app.use(logger('dev'));
app.use(renderPage);

app.use(gzip());

// bodyParser用于解析客户端请求的body中的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// cookieParser中间件用于获取web浏览器发送的cookie中的内容
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 全局应用index路由配置，具体路由配置进index设置
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    res.renderPage('index', {})
});

// error handlers
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.renderPage('error', {
            message: err.message,
            error: err
        })
    })
}

// production error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.renderPage('error', {
        message: err.message,
        error: {}
    })
});

module.exports = app;
