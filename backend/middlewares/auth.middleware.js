import jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config.js"
export async function authRequired(req,res,next){
    try{
        const {token} = req.cookies
        console.log("token is here",token,req.cookies)
        if(!token) return res.status(401).json({message:"Unauthorized"})

        jwt.verify(token,TOKEN_SECRET,(error,user) => {
            if(error) return res.status(400).json({message:"token is not valid"})
            req.user = user
            return next()

        })
    }

    catch(error){
        return res.status(500).json({message:error.message})

    }
}