const passport = require('passport');
require('../config/passport')(passport);

const passportMiddleware = [
	passport.initialize(),
	passport.session()
];

module.exports = passportMiddleware;
