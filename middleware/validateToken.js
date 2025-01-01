const jwt = require('jsonwebtoken');

const validateToken = async(req, resizeBy, next) => {
    try {
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization

        if (authHeader && authHeader.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'User not Authorized' })
                }
                req.user = decoded.user
                next()
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = validateToken