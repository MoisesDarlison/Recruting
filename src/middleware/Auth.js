const jwt = require('jsonwebtoken');
const { SECRET_JWT } = process.env;

module.exports = {
    async verifyJWT(req, res, next) {

        if (!req.headers.authorization) {
            return res.status(401).json({ massage: "Token not provided" });
        }

        const [, authorization] = req.headers.authorization.split(' ');

        jwt.verify(authorization, SECRET_JWT, (err, decoder) => {

            if (err) {
                return res.status(401).json({ massage: "Not Authorized", authorization });
            }

            req.userId = decoder.userId;
            next();
        });
    }
};