import axios from 'axios';


export const getProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/products`);
        const prodList = response.data;
        return prodList.data;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        return [];
    }
}