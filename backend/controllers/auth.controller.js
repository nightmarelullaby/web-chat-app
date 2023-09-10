import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js";

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userFound = await User.findOne({ email });
        if (!userFound) return res.status(400).json({ message: "User not found" })
        const passwordIsMatch = await bcrypt.compare(password, userFound.password)
        if (!passwordIsMatch) {
            console.log(passwordIsMatch)
            return res.status(400).json({ message: "invalid credentials" })
        }
        
        const token = await createAccessToken({ id: userFound._id })
    
        res.cookie("token", token, {
            expires:new Date(Date.now() + 9999999),
            httpOnly:false,
        })    
        req.user = userFound._id
    
        res.json({
            message: "Logged succesfully"
        })

        res.end()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userFound = await User.findOne({ email });
        if (userFound) return res.status(500).json({ message: "User already exists" })

        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })

        await res.cookie("token", token, {
            expires:new Date(Date.now() + 9999999),
            httpOnly:false,
        })
        await res.json({
            message: "User created"
        })
        return res.end()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error.message })
    }
}
const logout = async (req, res) => {
    res.cookie("token", "", {
        secure: true,
        expires: new Date(0)
    })
    const { token } = req.cookies
    return res.status(200).json({ message: "logout succesfully" })
}
const verifyToken = async (req, res) => {
    const { token } = req.cookies
    if (!token) return res.status(400).json({error:"token is not valid"})
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) {
            console.log(user,token)
            return res.sendStatus(401)
        }
        const authorId = req.user.id
        const userFound = await User.findById(user.id).populate("friendRequests",{}).populate("friends").populate({path:"chats",select:{messages:{"$slice":-1}},populate:{path:"users",model:"User"}})
        if (!userFound) {
            console.log(userFound)
            return res.sendStatus(401)}

        res.json(userFound);
    })

}

export { login, register, logout, verifyToken }