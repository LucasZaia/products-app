import axios from "axios";	

export const deleteProduct = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8081/products/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}