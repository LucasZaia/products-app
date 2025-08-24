import React, { useState, useCallback } from 'react'
import { createProduct } from '../../data/Products/create'
import { Product } from '../../interfaces/products'
import { Form, Link, useLoaderData, useNavigate, useSubmit} from 'react-router'
import './products.css'
import { fixedCategorys } from '../../consts/fixed_categorys';
import ButtonAction from '../ui/button/buttonAction';
import PictureEdit from '../ui/pictureEdit/pictureEdit';

interface ProductFormData {
  type: 'create' | 'update';
  product?: Product;
}

const ProductsForm = ({product, type}: ProductFormData) => {

  const submit = useSubmit();
  const categories = fixedCategorys;
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/produtos');
  }

  const handleCancel = () => {
    navigate('/produtos');
  }

  const handleImageChange = (image: string) => {
    console.log('Nova imagem selecionada:', image);
  }

  return (
    <div className="add-prod-container">
      
      <h1>{type === 'create' ? 'Cadastro de Produto' : 'Editar detalhes do Produto'}</h1>
      <div className="add-prod-form">
        <Form method={type === 'create' ? 'post' : 'put'} action={type === 'create' ? '/cadastro-produto' : `/editar-produto/${product?.id}`} encType='multipart/form-data'>
          <PictureEdit currentImage={product?.pictureUrl} onImageChange={handleImageChange} />
          <div className="add-prod-form-group">
            <label htmlFor="name">Nome:</label>
            <input type="text" id="name" name="name" placeholder='Nome do produto' required={true} defaultValue={product?.name} />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="description">Descrição:</label>
            <textarea id="description" name="description" rows={5} cols={50} placeholder='Descrição do produto' defaultValue={product?.description} />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="price">Preço:</label>
            <input type="number" step="0.01" id="price" name="price" placeholder='Preço do produto' required={true} defaultValue={product?.price} />
          </div>
          <div className="add-prod-form-group">
            <label htmlFor="category">Categoria:</label>
            <select id="category" name="category" defaultValue={product?.category}>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="add-prod-form-group">
            <div className="buttons-container">
              <ButtonAction text="Enviar" type="primary" format="large" border="default" buttonType="submit" />
              <ButtonAction onClick={handleCancel} text="Cancelar" type="secondary" format="large" border="default" buttonType="button" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ProductsForm