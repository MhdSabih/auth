const router = require('express').Router();
const verify = require('../token/verifyToken');


router.get('/', verify ,(req, res) => {
    res.json({
        "Title": "My Love",
        "Description": "This is my love story",
    })
});

module.exports = router;