import e from "express";
import landingRoutes from './routes/landingRoutes.js';

const app = e();

app.use(e.json());

app.use('/',landingRoutes);

app.use((err,req,res)=>{
    console.error(err.stack);
    res.status(500).json({
        error:'Something went wrong!'
    })
});

export default app;