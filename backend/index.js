import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from '../backend/Routers/auth.js'
import userRoute from '../backend/Routers/user.js'
import doctorRoute from '../backend/Routers/doctor.js'
import reviewRoute from '../backend/Routers/review.js'
import bookingRoute from '../backend/Routers/booking.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
    origin: true
}

//middleware

app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.send('Api is working')
})

app.use('/api/v1/auth',authRoute)   //doamin/api/v1/auth/register
app.use('/api/v1/users',userRoute)   //doamin/api/v1/auth/user
app.use('/api/v1/doctors', doctorRoute);  //doamin/api/v1/auth/doctor
app.use('/api/v1/reviews',reviewRoute)   //doamin/api/v1/auth/doctor
app.use("/api/v1/bookings",bookingRoute)


//database connection

mongoose.set('strictQuery', false)

const connectDB = async () => {
    
        await mongoose.connect(process.env.MONGO_URL)

        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Failed to connect to MongoDB', err));
    

}



app.listen(port, () => {
    connectDB();
    console.log("server is running on port " + port);
})

