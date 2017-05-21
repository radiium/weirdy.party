var fs  = require('fs');
var log = require('winston');

var files = {};

//-----------------------------------------------------------------------------
// Count number of object in a directory
files.countObjInDir = function(dir) {
    var count = fs.readdirSync(dir).length;
    //log.info("Directory : '" + dir + "' contain : " + count + " object(s)");
    return count;
}

//-----------------------------------------------------------------------------
// Clean objects in a directory
files.cleanTmpDir = function(TMP_DIR) {
    var files = fs.readdirSync(TMP_DIR);
    files.forEach(file => {
        //log.info("Remove : '" + TMP_DIR + "/" + file + "'");
        fs.unlinkSync(TMP_DIR + "/" + file);
    });
};

//-----------------------------------------------------------------------------
// Create directory
files.createDir = function(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        //log.info("Create directory : '" + dir + "'");
    }
};

//-----------------------------------------------------------------------------
// Create file in specified directory
files.createFile = function(file_path, content) {
    fs.writeFile(file_path, content, function(err) {
        if (err) throw err;
        //log.info('File write completed');
    });
};

//-----------------------------------------------------------------------------
// Move file in other directory
files.moveFile = function(tmpPath, newPath) {
    fs.createReadStream(tmpPath)
    .pipe(fs.createWriteStream(newPath));
};

module.exports = files;
