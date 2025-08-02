import { Product } from "../../interfaces/products";
import { getProducts } from "./list";

export const createProduct = async (product: Product) => {

    const prodList = await getProducts();
    const newProduct: Product = {
        id: prodList.length + 1,
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image || ""
    }

    prodList.push(newProduct);
    localStorage.setItem('prodList', JSON.stringify(prodList));
    return newProduct;
}