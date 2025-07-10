export const getAllProductsStatic = (req, res) => {
    try {
        res.status(201).send({
            msg: "Products testing routes"
        })
        
    } catch (error) {
        
    }

}

export const getAllProducts = () => {
    try{
        res.status(201).send({
            msg: "Products routes"
        })

    } catch(error) {

    }
}