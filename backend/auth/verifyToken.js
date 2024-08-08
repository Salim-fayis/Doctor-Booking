 import jwt from 'jsonwebtoken'
 import Doctor from '../models/DoctorSchema.js'
 import User from '../models/UserSchema.js'


export const authenticate = async (req, res, next) => {
    // Get token from headers
    const authToken = req.headers.authorization;

    // Check if token exists and starts with 'Bearer'
    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }

    try {
        

        const token = authToken.split(' ')[1];
       const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.id
        req.role = decoded.role
        next() // must be call the next function
        
    } catch (err) {

        if(err.name === 'TokenExpiredError'){
            console.log('token expired');
            
            return res.status(401).json({message:'Token is expired'})
        }

        return res.status(401).json({sucess : false,message:"Invalid token"})
        
    }

}

export const restrict = roles => async (req, res, next) => {
    const userId = req.userId;
    console.log('User ID:', userId);

    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);

    if (patient) {
        user = patient;
    } else if (doctor) {
        user = doctor;
    }

    if (!user || !roles.includes(user.role)) {
        console.log('User does not have permission or user not found');
        return res.status(401).json({ success: false, message: "You're not authorized" });
    }

    console.log('User role:', user.role);
    next();
};