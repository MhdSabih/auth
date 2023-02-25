const jwt =  require('jsonwebtoken');

const _KEY = 'YOUR ARE A LOSER!'

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verification = jwt.verify(token, _KEY);
        console.log(verification);
        req.user = verification;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = verifyToken