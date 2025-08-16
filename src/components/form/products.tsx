import React, { useState, useCallback } from 'react'
import { createProduct } from '../../data/Products/create'
import { Product } from '../../interfaces/products'
import { Form, Link, useLoaderData, useNavigate} from 'react-router'
import './products.css'
import { fixedCategorys } from '../../consts/fixed_categorys';

const ProductsForm = () => {

  const categories = fixedCategorys;
  const navigate = useNavigate();

  const handleCancel = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    navigate('/produtos');
  }

  return (
    <div className="add-prod-container">
      <h1>Cadastro de Produto</h1>
      <div className="add-prod-form">
        <Form method='post' action='/cadastro-produto' encType='multipart/form-data'>
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
            <label htmlFor="category">Categoria:</label>
            <select id="category" name="category">
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="image">Imagem:</label>
            <input type="file" id="image" name="image" placeholder='Imagem do produto' />
          </div>
          <div className="add-prod-form-group">
            <div className="buttons-container">
              <input type="submit" value="Salvar" />
              <input value="Cancelar" onClick={handleCancel} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ProductsForm