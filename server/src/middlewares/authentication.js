import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader);
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(400).json({
                success: false,
                error:'No token Provided'
            });
        };

        const token = authHeader.split(' ')[1];

        // verify token
        const decoded = verifyToken(token);

        if(!decoded){
            return res.status(400).json({
                success: false,
                error: 'Invalid or expired token'
            });
        }

        // console.log(decoded);
        req.user = decoded;

        next();
    } catch (err) {
        console.error("Authentication",err.message);
        res.status(500).json({
            success:false,
            error:err.message
        });
    }
};