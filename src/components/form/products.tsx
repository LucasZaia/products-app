import React, { useState, useCallback } from 'react'
import { createProduct } from '../../data/Products/create'
import { Product } from '../../interfaces/products'
import { Link, useLoaderData, useNavigate} from 'react-router'
import './products.css'

const ProductsForm = () => {

  const { categories } = useLoaderData<{ categories: string[] }>();
  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const image = formData.get('image') as File;
    const imageUrl = URL.createObjectURL(image);

    console.log(formData.get('category'));
    const product: Product = {
      id: 0,
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      price: Number(formData.get('price')),
      image: imageUrl

    };
    await createProduct(product);
    navigate('/produtos');
  }, []);

  return (
    <div className="add-prod-container">
      <h1>Cadastro de Produto</h1>
      <div className="add-prod-form">
        <form method='post' onSubmit={handleSubmit}>
          <div className="add-prod-form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder='Nome do produto' />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea id="description" name="description" rows={5} cols={50} placeholder='Descrição do produto' />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="price">Preço:</label>
            <input type="number" id="price" name="price" placeholder='Preço do produto' />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="image">Imagem:</label>
            <input type="file" id="image" name="image" placeholder='Imagem do produto' />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="category">Categoria:</label>
            <select id="category" name="category">
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="add-prod-form-group">
            <div className="buttons-container">
              <input type="submit" value="Salvar" />
              <input type="button" value="Cancelar" onClick={() => navigate('/produtos')} />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductsForm