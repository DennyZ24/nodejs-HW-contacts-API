const multer = require('multer');
const path = require('path');
const { createError } = require("../helpers/createErrors");

const temp = path.join(__dirname, '../temp');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, temp)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage,
    fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype.includes('image')) {
            cb(null, true)
        } else {
          cb(createError(400, 'Wrong format data'));
        }
    }
})

module.exports = upload;