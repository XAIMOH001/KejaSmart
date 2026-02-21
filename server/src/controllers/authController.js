import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import {generateToken} from '../utils/jwt.js'

export const register = async (req, res) => {
  try {
    const { email, password, name, userType ,phoneNumber} = req.body;

    if (!email || !password || !name || !userType) {
      console.error("Please fill in all fields");
      return res.status(400).json({
        success: false,
        error: "Please fill in all fields",
      });
    }

    if (userType !== "tenant" && userType !== "landlord") {
      return res.status(400).json({
        success: false,
        error: 'userType must be either "tenant" or "landlord"',
      });
    }

    if (userType == 'tenant' && !phoneNumber){
        console.error("Phone number is required for tenants");
        return res.status(400).json({
            success:false,
            error:"Phone number is required for tenants"
        })
    }

    const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",[email]
    )

    // check if user exists already
    if(existingUser.rows.length > 0){
        console.log("email already exists");
        return res.status(400).json({
            success:false,
            error:'User with this email already exists'
        })
    };

    // hash password:
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password,saltRounds);
    
    // register user:
        const result = await pool.query(
           'INSERT INTO users(full_name, email, password, user_type, phone_no) VALUES($1, $2, $3, $4, $5) RETURNING id, full_name, email, user_type, phone_no, created_at',
      [name, email, hashedPass, userType, phoneNumber || null]
        );

    res.status(201).json({
        message:`${userType} created successfully`,
        user:result.rows[0],
        success:true
    })
  } catch (err) {
    console.error("Internal server error:",err.message)
    res.status(500).json({
        success:false,
        error:err.message
    })
  }
};


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({
                success:false,
                error:'Please provide email and password'
            })
        };

        // check if user exists
        const existingUser = await pool.query(
            "SELECT * FROM users WHERE email=$1",[email]
        );

        if(existingUser.rows.length == 0){
            return res.status(400).json({
                success:false,
                error:"Email does not exist"
            })
        };

        // validate password:
        const user = existingUser.rows[0];
        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                success:false,
                error: 'Invalid credentials'
            })
        }

        const payload = {
            id:user.id,
            email:user.email,
            userType:user.user_type
        };

        const token = generateToken(payload);

        
        res.status(200).json({
            message:"Login successfully",
            success:true,
            user:{
                "email": user.email,
                "name":user.full_name
            },
            token
        })


    } catch (err) {
        console.error("Error loggin in",err.message);
        res.status(500).json({
            success:false,
            error:err.message
        })
    }
}


export const getProfile = async (req,res)=>{
    try {
        const userId = req.user.id;

        const results = await pool.query(
            "SELECT full_name,email, user_type, updated_at FROM users WHERE id=$1",[userId]
        );

        if(results.rows.length == 0){
            return res.status(404).json({
                success:false,
                error:'User not found'
            });
        }
        
        const user = results.rows[0];

        res.status(200).json({
            message:"Profile returned successfully",
            success:true,
            profile:{
                id:user.id,
                name:user.full_name,
                email:user.email,
                userType:user.user_type,
                updatedAt:user.updated_at
            }
        });
    } catch (err) {
        console.error("Error getting profiele", err.message);
        res.status(500).json({
            success: false,
            error: err.message
    });
    }
}