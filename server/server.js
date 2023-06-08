/* CONFIG */
const express = require('express');
const bodyParser = require('body-parser');
const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const { fileURLToPath } = require('url');

/* CONFIG */
dotenv.config();
const app = express();
const users = require('./routes/users');
const posts = require('./routes/posts');

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '30mb', extended: 'true' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: 'true' }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
const s3 = new S3Client();
const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'some-bucket',
		metadata: function (req, file, cb) {
			cb(null, { fieldName: file.fieldname });
		},
		key: function (req, file, cb) {
			cb(null, Date.now().toString());
		},
	}),
});

/* DATABASE */
const PORT = process.env.PORT || 8001;
mongoose
	.connect(process.env.MONGO_DB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () => console.log(`Server start on port: ${PORT}`));
	})
	.catch((error) => {
		console.log(`${error}: Did not connect`);
	});

/* ROUTES */
app.get('/', (req, res) => {
	res.status(200).json({ message: 'This is message' });
});

app.use('/users', users);
app.use('/posts', posts);
