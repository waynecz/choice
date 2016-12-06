const path = require('path');

const {readFilePrms, writeFilePrms} = require('./fsPromise');

const changeTimeStamp = function (file) {
    readFilePrms(file).then(data => {
        let reg = /t=\d{13}/g;
        let newContent = data.data.replace(reg, `t=${new Date().getTime()}`);
        writeFilePrms(file, newContent).then(() => {
            console.log(file + '时间戳搞定!')
        });

    })
};

module.exports = {
    changeTimeStamp
};