import { Product } from "../../interfaces/products"
import { useEffect, useState } from "react"
import './import_list.css'
import ButtonAction from "../ui/button/buttonAction"
import { createProduct } from "../../data/Products/create"
import { useNavigate } from "react-router"
import { Icon } from "@iconify/react"
import { fixedCategorys } from "../../consts/fixed_categorys"

const ImportList = ({ products }: { products: Product[] }) => {
    const [allProductsSelected, setAllProductsSelected] = useState(true)
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const navigate = useNavigate()

    const handleSelectAllProducts = () => {
        setAllProductsSelected(!allProductsSelected)
        if (allProductsSelected) {
            const completeProducts = products.filter(product => !isProductIncomplete(product))
            setSelectedProducts(completeProducts)
        } else {
            setSelectedProducts([])
        }
    }

    const handleSelectProduct = (product: Product) => {
        if (selectedProducts.includes(product)) {
            setSelectedProducts(selectedProducts.filter(p => p !== product))
        } else {
            setSelectedProducts([...selectedProducts, product])
        }
    }

    const handleImportProducts = async () => {
        selectedProducts.forEach(async (product) => {
            try {
                await createProduct(product)
            } catch (error) {
                console.log(error)
            }
        })
       navigate('/')
    }

    const isProductIncomplete = (product: Product) => {
        const isPriceValid = typeof product.price === 'number' && !isNaN(product.price) && product.price > 0
        return !product.name || !product.description || !isPriceValid || !product.category
    }

    const getMissingFields = (product: Product) => {
        const errors = []
        if (!product.name) errors.push('Nome')
        if (!product.description) errors.push('Descrição')
        
        const isPriceValid = typeof product.price === 'number' && !isNaN(product.price) && product.price > 0

        if (!isPriceValid) errors.push('Preço (deve ser um número válido)')
        
        if (!product.category) errors.push('Categoria não informada')
        if (!fixedCategorys.find(category => category === product.category)) errors.push('Categoria não existe')
        
        return errors
    }

    return (
        <div>
            <h3>Marque os produtos para importação:</h3>
            <table className="import-list-table">
                <thead>
                    <tr className="import-list-table-header">
                        <th><input type="checkbox" className="import-list-checkbox" onClick={() => handleSelectAllProducts()} /></th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index} className={isProductIncomplete(product) ? 'incomplete-product' : ''}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={selectedProducts.includes(product)} 
                                    className="import-list-checkbox" 
                                    onClick={() => handleSelectProduct(product)}
                                    disabled={isProductIncomplete(product)}
                                />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.category}</td>
                            <td>
                                {isProductIncomplete(product) ? (
                                    <div className="status-error-container">
                                        <Icon 
                                            icon="mdi:alert" 
                                            className="status-alert-icon"
                                        />
                                        <div className="error-description">
                                            Erros: {getMissingFields(product).join(', ')}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="status-success-container">
                                        <Icon icon="mdi:check" className="status-check-icon" />
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedProducts.length > 0 && (
                <ButtonAction  text={`Importar ${selectedProducts.length}`} onClick={() => handleImportProducts()} type="primary" format="medium" border="default" />
            )}
        </div>
    )
}

export default ImportList