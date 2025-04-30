const cors = require('cors');

const corsOptions = {
	origin: "http://localhost:8080",
	methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
	allowedHeaders: "Content-Type, Authorization",
	credentials: true,
};

module.exports = cors(corsOptions);
