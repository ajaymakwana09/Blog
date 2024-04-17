const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate a unique filename
        cb(null, uniquePrefix + '-' + file.originalname); // Set the filename
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
