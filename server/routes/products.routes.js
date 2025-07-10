import { Router } from "express";
import { getAllProducts, getAllProductsStatic } from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get('/', getAllProducts);
productsRouter.get('/static', getAllProductsStatic);

export default productsRouter;