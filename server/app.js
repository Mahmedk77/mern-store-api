import express from 'express';
import cors from 'cors'
import { connectToDataBase } from './database/mongoDB.js';
import productsRouter from './routes/products.routes.js';
import { notFoundMiddleware } from './middlewares/notFound.middleware.js';
import { errorMiddleware } from './middlewares/error.middleware.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(errorMiddleware);

app.use('/api/v1/products', productsRouter)

// Define all valid routes above this line
app.get("/", (req, res) => {
    res.send(`<h1>Store Api</h1> <a href="/api/v1/products">products route</a>`);
})

// If no route matches above, this middleware handles 404 errors
app.use(notFoundMiddleware);

// Central error handler for thrown errors from anywhere above

app.listen(5000, async ()=>{
    console.log('Listening, http://localhost:5000');
    await connectToDataBase();
})

export default app