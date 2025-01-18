const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/Users.js")

router.post("/register", async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // Name is available?
        const lowerName = name.toLowerCase();
        const existingName = await Users.findOne({ userName: lowerName });
        if (existingName) {return res.status(400).json({ error: "Bu kullanıcı adı başkası tarafından kullanılıyor." });}

        // Mail is available
        const lowerEmail = email.toLowerCase();
        const existingMail = await Users.findOne({ userMail: lowerEmail });
        if (existingMail) {return res.status(400).json({ error: "Bu e-posta adresi başkası tarafından kullanılıyor." });}
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Save user
        const newUser = new Users({ userName: lowerName, userMail: lowerEmail, userPassword: hashedPassword });
        await newUser.save();

        // Send data
        const userData = newUser.toObject();
        res.status(200).json({id: userData._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
})

router.post("/login", async (req, res) => {
    try {
        const { password, name } = req.body;

        // Check user is valid
        const lowerName = name.toLowerCase();
        const existingUser = await Users.findOne({ userName: lowerName });
        if (!existingUser) {return res.status(400).json({ error: "Kullanıcı bulunamadı!" });}

        // Check stored password is valid
        const isPasswordValid = await bcrypt.compare(password, existingUser.userPassword);
        if (!isPasswordValid) {return res.status(401).json("Yanlış şifre!");}

        // Send Data
        const userData = existingUser.toObject();
        res.status(200).json({id: userData._id});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
})

module.exports = router;
