import axios from "axios";

export const getProduct = async (id: number) => {
    try {
        const response = await axios.get(`http://localhost:8081/products/${id}`);
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }   
}