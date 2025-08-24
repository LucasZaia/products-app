import { Product } from "../../interfaces/products";
import { getProducts } from "./list";
import axios from 'axios';

export const createProduct = async (product: Product) => {
    try {
        const response = await axios.post(`http://localhost:8081/products/create`, JSON.stringify(product), {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(response.data.data)
        return response.data.data.id;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        return null;
    }
}