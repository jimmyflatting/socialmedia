const multer = require('multer');

const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 52428800 },
});

module.exports = upload;
