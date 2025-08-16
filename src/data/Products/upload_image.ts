import axios from 'axios';

export const uploadImage = async (image: File, id: number) => {
    const body = new FormData();
    body.append('image', image);
    try {
        await axios.put(`http://localhost:8081/products/upload_image/${id}`, body);
        return true;
    } catch (error) {
        console.error('Erro ao enviar imagem:', error);
        return null;
    }
}