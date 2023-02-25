const router = require('express').Router();
const bcrypt = require('bcrypt')
const User = require('../models/Usermodel');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation/validation');

const _KEY = 'YOUR ARE A LOSER!'

router.post('/register', async (req, res) => {
    // LETS VALIDATE BEFORE SAVING THE USER!
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //IF USER ALREADY EXISTS?
    const userExists = await User.findOne({email: req.body.email});
    if(userExists) return res.status(409).send(`User already exists!`);

    //Hashing password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    //CREATE NEW USER
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        const savedUser = await user.save();

        res.send('user created')
    } catch (error) {   
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    // LETS VALIDATE BEFORE EXTACTING THE USER!
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //COMPARE THE EMAIL IF ITS EXISTS
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Wrong Credentials")
    //SAME FOR PASSWORD
    const passwordExists = await bcrypt.compare(req.body.password, user.password);
    if(!passwordExists) return res.status(400).send("Wrong Credentials");
    //CREATE TOKEN
    const token = jwt.sign({_id: user._id}, _KEY);
    res.header('auth-token', token)
    //RETURN THE USER
    try {
        res.status(200).send(token);
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports = router;