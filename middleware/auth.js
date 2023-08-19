const jwt = require('jsonwebtoken')
require('dotenv').config()

const AuthService = {
    authenication: async (req, res, next) => {
        let token = req.headers.authorization;
        if (token) {
            token = token.slice(7);
            try {
                let decoded = jwt.verify(token, process.env.ACCESSTOKENSECRETKEY)
                if (decoded._id) {
                    req._id = decoded._id
                    next();
                }
            } catch (e) {
                res.status(500).json({status: false, Error: e})
            }
        } else {
            return res.status(403).send({status: true, message: 'No token provided.'});
        }
    }
}

module.exports = AuthService;