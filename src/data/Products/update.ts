import axios from "axios";
import { Product } from "../../interfaces/products";

export const updateProduct = async (id: number, product: Product) => {
    try {
        const response = await axios.put(`http://localhost:8081/products/update/${id}`, JSON.stringify(product), {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        return null;
    }
}