
import jwt from "jsonwebtoken"

const generateToken = (user,secret,expires) =>{
   return jwt.sign({user:user.id},secret,{expiresIn:expires})

}
export default generateToken