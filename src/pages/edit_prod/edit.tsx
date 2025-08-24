import ProductsForm from "../../components/form/products";
import { Product } from "../../interfaces/products";
import { useLoaderData } from "react-router";

const EditProd = () => {
    const { product } = useLoaderData<{ product: Product }>();
    
    return (
        <div className="edit-prod-container">
            <ProductsForm type="update" product={product} />
        </div>
    )
}

export default EditProd;