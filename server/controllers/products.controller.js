import { Product } from "../model/products.model.js"

// ! SPELLINGS ARE 'QUERY'
const parsingFunction = (toParse) => {
    return toParse.split(",").join(" ")
}

export const getAllProductsStatic = async (req, res) => {
    try {

        // const products = await Product.find({company: "ikea"})
        console.log(req.query)
        const { featured, sort, field } = req.query
        // const upatedSort = sort.split(',').join(" ")
        // console.log("for sort",upatedSort);
        const featuredProducts = await Product.find({featured}).select(field)

        res.status(200).send({
            msg: "Products testing routes",
            data: featuredProducts
        })
        
    } catch (error) {
        console.log(error)
    }

}

export const getAllProducts = async (req, res) => {

    try{
        console.log(req.query)
        const { featured, company, name, sort, field, numericFilters } = req.query;
        const queryObj = {};

        if(featured){
            queryObj.featured = featured === 'true' ? true : false;
        }
        if(name){
            queryObj.name =  { $regex: name, $options: 'i' }; 
            // Enables case-insensitive partial search on the 'name' field
        }
        if(company){
            queryObj.company = company;
        }
        
        if (numericFilters) {
        const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
        };
        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
        regEx,
        (match) => `-${operatorMap[match]}-`
        );
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
            queryObj[field] = { [operator]: Number(value) };
        }
        });
        }

        let result = Product.find(queryObj);
        
        if(sort){
            const parsedSort = parsingFunction(sort)
            result = result.sort(parsedSort);
        }
        else{
            result = result.sort("createdAt");
        }
        
        if(field){
            const parsedField = parsingFunction(field);
            result = result.select(parsedField)
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page-1)*limit;
        // skip concept ==> page = 3, limit = 5
        // const skip = (3 - 1) * 5 = 10
        // So it skips first 10 results, and returns the next 5 (items 11–15)

        result = result.skip(skip).limit(limit)

        const products = await result 


        res.status(200).send({
            msg: "Products routes",
            data: products,
            nHbits: products.length
        })

    } catch(error) {
        console.log(error)

    }
}


//!add in notes
//queryobj helps to maintain cleaness and control, 
//with queryObj we can easily use sorting, pagination, filtering
//.find always retruns an array, [must be used with await first or do it at end like in this code]