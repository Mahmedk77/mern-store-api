import mongoose from 'mongoose'
import { DB_URI } from '../config/env.config.js'

import { productsJSON } from '../utils/products.js'
import { Product } from '../model/products.model.js'


export const connectToDataBase = async () =>{
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to Database...")
        await Product.deleteMany() //Deletes all existing projects..
        await Product.create(productsJSON)
        console.log('Sucessfully added products');
        // process.exit(0) //we exit if everthing goes well
        
    } catch (error) {
        console.log('Error connecting to database: ', error)
        process.exit(1)
        
    }

}