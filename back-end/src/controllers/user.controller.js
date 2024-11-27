const User = require('../models/user.model');

const register = async (req, res) => {
    try {
        const existingUser = await User.findOne({ mail: req.body.mail });

        if (existingUser) {
            return res.status(409).json({ msg: "User with this email already exists", statusCode: 409 });
        }

        const newUser = new User({
            name : req.body.name,
            mail : req.body.mail,
            contact : req.body.contact,
            pwd : req.body.pwd
        })
        const savedUser = await newUser.save();
        res.status(201).json({ msg: "User registered Sucessfully", user: savedUser, statusCode: 201 });
    } catch (error) {
        res.json(error);
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ mail: req.body.mail, pwd: req.body.pwd });

        if (!user) {
            return res.status(401).json({ msg: "Invalid Credentials", statusCode: 401 });
        }

        res.json({ msg: "Login Successful", user: user, statusCode: 200 });
    } catch (error) {
        res.json(error);
    }
};

const logout = async (req, res) => {

    try{
        return res.status(200).json({ msg: "Logout successful", statusCode: 200 });
    } catch(error){
        res.json(error);
    }
};

module.exports = { register, login, logout };