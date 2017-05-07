var fs        = require('fs');
var winston   = require('winston');

var files = {};

//-----------------------------------------------------------------------------
// Files Utils

// return uniq name
files.uniqname = function() {
    //   return '_' + Math.random().toString(36).substr(2, 9);
    return new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9);
};

// Count number of object in a directory
files.countObjInDir = function(dir) {
    var count = fs.readdirSync(dir).length;
    //winston.info("Directory : '" + dir + "' contain : " + count + " object(s)");
    return count;
}

// Clean objects in a directory
files.cleanTmpDir = function(TMP_DIR) {
    fs.readdir(TMP_DIR, (err, files) => {
        files.forEach(file => {
            //winston.info("Remove : '" + TMP_DIR + "/" + file + "'");
            fs.unlink(TMP_DIR + "/" + file);
        });
    });
};

// Create directory
files.createDir = function(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        //winston.info("Create directory : '" + dir + "'");
    } else {
        //let newDir = c + "_" + countArticles();
        //fs.mkdirSync(newDir);
        //winston.warning("Directory '" + dir + "' already exist!");
        //winston.info("Create directory : '" + newDir + "'");
    }
};
files.createFile = function(file_path, content) {
    fs.writeFile(file_path, content, function(err) {
        if (err) throw err;
        //winston.info('File write completed');
    });
}

//-----------------------------------------------------------------------------
// Clean objects in a directory
files.getPagesList = function(dir) {
    var filesList = [];
    var list = fs.readdirSync(dir);
    list.forEach(file => {
        filesList.push('/' + file.substr(0, file.lastIndexOf('.')));
        winston.info(file.substr(0, file.lastIndexOf('.')));
    });
    return filesList;
};

module.exports = files;
