let User = require('../models/UserModel');
//user registeration
    const registerUser = async (req, res) => {
    try {
        const { name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password});
        await newUser.save(); // bcrypt pre('save') hook triggers here

        res.status(201).json({ message: "User registered successfully" });
        
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


const authController = {registerUser};

module.exports = authController