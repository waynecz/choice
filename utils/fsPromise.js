var fs = require('fs');

var readDirPrms = function (dirPath) {
    return new Promise((resolve, reject) => {
        fs.readdir(dirPath, (err, files) => {
            if (err) return reject(err);
            resolve(files);
        });
    });
};

var readFilePrms = function (file, fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, {encoding: 'utf-8'}, (err, data) => {
            if (err) return reject(err);
            resolve({data: data, fileName: fileName});
        });
    });
};

var writeFilePrms = function (filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) return reject(err);
            resolve('OK');
        })
    })
};

var delFilePrms = function (filePath) {
    return new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
            if (err) return reject(err);
            resolve('OK');
        })
    })
};

module.exports = {
    readDirPrms,
    readFilePrms,
    writeFilePrms,
    delFilePrms
};