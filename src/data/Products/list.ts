export const getProducts = async () => {
    const prodList = localStorage.getItem('prodList');
    console.log(prodList);
    if (prodList) {
        return JSON.parse(prodList);
    } else {
        return [];
    }
}