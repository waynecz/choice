const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    const title = "首页";
    res.renderPage('index', {
		title
    });
});
module.exports = router;
