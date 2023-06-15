import http from 'http';
import app from './app.js';
const server = http.createServer(app);

// server listening
const port = process.env.PORT || 8001;
server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
