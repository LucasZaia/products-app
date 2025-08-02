import { prodList } from "../../consts/prodlist";

export const createAllProducts = async () => {
    if (localStorage.getItem('prodList')) {
        return;
    } else {
        localStorage.setItem('prodList', JSON.stringify(prodList));
    }
}