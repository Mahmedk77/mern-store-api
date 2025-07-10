import mongoose from 'mongoose'
import { DB_URI } from '../config/env.config.js'


export const connectToDataBase = async () =>{
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to Database")
        
    } catch (error) {
        console.log('Error connecting to database: ', error)
        
    }

}