import { prodList } from "../../consts/prodlist";

export const getCategories = async () => {
    
    const categories = prodList.map((product) => product.category);
    return categories;
}