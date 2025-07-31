const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require ("../models/user");

const signup = async(req, res) => {
    const {name, username, country, state, city, email, password} = req.body;

    if (!name || !email || !username || !country || !state || !city || !password){
        return res.status(400).json({success: false, message: "Please provide all the details"})
    }

    try {
        const existingUser = await userModel.findOne({email: email.toLowerCase()});

        if (existingUser){
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // FIX: Use nested location object
        const user = await userModel.create({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            address: {
              country: req.body.country,
              state: req.body.state,
              city: req.body.city,
            }
          });
      

        await user.save();

        // Issue JWT if JWT_SECRET is configured
        if (process.env.JWT_SECRET) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7*24*60*60*1000
            });
        } else {
            console.log('JWT_SECRET not configured. User created but no token issued.');
        }

        return res.status(200).json({success: true, message: user});

    } catch(err){
        res.status(500).json({success: false, message: err.message})
    }

}


const login = async(req,res) => {
    const {username, password} = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and Password are required"})
    }

    try {
        const user = await userModel.findOne({username: username});

        if (!user){
            return res.status(400).json({success: false, message: "Invalid Username"});
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch){
            return res.status(400).json({success: false, message: "Invalid Password"});
        }

        // Issue JWT if JWT_SECRET is configured
        if (process.env.JWT_SECRET) {
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '7d' });

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 7*24*60*60*1000
            });
        } else {
            console.log('JWT_SECRET not configured. Login successful but no token issued.');
        }

        return res.status(200).json({success: true, message: user});

    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}


const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.status(200).json({success: true, message: "Logged Out"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {signup, login, logout};