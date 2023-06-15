import multer from 'multer';

const storage = multer.memoryStorage();
const limits = { fileSize: 52428800 };

const upload = multer({ storage, limits });

export { upload };
