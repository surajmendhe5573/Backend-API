const User = require('../../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/keys'); // Import the config
const messages = require('../../helper/commonmessages'); // Import the common messages

// sign up
const signup= async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(401).json({ message: messages.auth.userExists });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: messages.auth.signUpSuccess, newUser });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: messages.auth.refreshTokenError });
    }
};

// sign in
const signin= async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });

        // Check if user exists
        if (!userExist) {
            return res.status(401).json({ message: messages.auth.userDoesNotExists });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({ message: messages.auth.passwordDoesNotMatch });
        }

        // Create and sign JWT
        const token = jwt.sign({ id: userExist._id }, config.JWT_SECRET, { expiresIn: config.authentication.authTokenExpiry });
        res.json({ token, message: messages.auth.loginSuccess });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: messages.auth.refreshTokenError });
    }
};

module.exports = {signup, signin};
