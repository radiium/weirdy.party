var fs        = require('fs');
var winston   = require('winston');

var files = {};

//-----------------------------------------------------------------------------
// Files Utils

//-----------------------------------------------------------------------------
// Count number of object in a directory
files.countObjInDir = function(dir) {
    var count = fs.readdirSync(dir).length;
    //winston.info("Directory : '" + dir + "' contain : " + count + " object(s)");
    return count;
}

//-----------------------------------------------------------------------------
// Clean objects in a directory
files.cleanTmpDir = function(TMP_DIR) {
    fs.readdir(TMP_DIR, (err, files) => {
        files.forEach(file => {
            //winston.info("Remove : '" + TMP_DIR + "/" + file + "'");
            fs.unlink(TMP_DIR + "/" + file);
        });
    });
};

//-----------------------------------------------------------------------------
// Create directory
files.createDir = function(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        //winston.info("Create directory : '" + dir + "'");
    }
};

//-----------------------------------------------------------------------------
// Create file in specified directory
files.createFile = function(file_path, content) {
    fs.writeFile(file_path, content, function(err) {
        if (err) throw err;
        //winston.info('File write completed');
    });
};

//-----------------------------------------------------------------------------
// Move file in other directory
files.moveFile = function(tmpPath, newPath) {
    fs.createReadStream(tmpPath)
    .pipe(fs.createWriteStream(newPath));
};


module.exports = files;
