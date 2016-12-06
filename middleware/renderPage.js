const template = require('art-template');
const path = require('path');
const fs = require('fs');
const layoutPath = path.resolve(process.cwd(), 'views/layout/layout');

module.exports = function (req, res, next) {
    if (req.method != 'GET') {
        return next();
    }
    res.renderPage = function (screenPath, data) {
        var screenPath = path.join('views/screen', screenPath);

        fs.stat(screenPath + '.html', function (err) {
            if (err) {
                return res.send("找不到" + screenPath);
            }
            data.ctx = template(screenPath, data);

            return res.render(layoutPath, data);
        });
    };
    next()
};