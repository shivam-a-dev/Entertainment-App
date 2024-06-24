import jwt from "jsonwebtoken";


export default function createToken(res, user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        
    }, {expiresIn : '30d'})

    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000
    })

    return token
}