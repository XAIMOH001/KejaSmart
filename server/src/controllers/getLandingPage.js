export const getLandingPage = (req,res)=>{
    try {
        
        const data = {
            message: "Welcome to KejaSmart landing Page",
            success: true,
            timestamp: new Date().toISOString
        }
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({
            error:err.message,
            success:false
        })
    }
};