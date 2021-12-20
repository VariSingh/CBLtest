let jwt = require('jsonwebtoken');
const { secret, pass_secret } = require("../config");

const authenticate = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token does not exists'
        });
    }
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.split(" ")[1];
    }

    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {

                // if (Date.now() >= decoded.exp * 1000) {
                //     return res.status(401).json({
                //         success: false,
                //         message: 'Token expired'
                //     });
                // }

                req.payload = decoded;

                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

const authPassword = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token) {
        jwt.verify(token, pass_secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Link is not valid or has expired'
                });
            } else {
                req.payload = decoded;
                next();
            }
        });
    }else{
        return res.status(401).json({
            success: false,
            message: 'Link is not valid or has expired'
        });
    }
}


module.exports = {
    authenticate,
    authPassword
}
