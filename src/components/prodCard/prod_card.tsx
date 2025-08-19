
import React, { useState } from 'react';
import './prod_card.css';
import Modal from '../modal/modal';
import { deleteProduct } from '../../data/Products/delete';
import { useRevalidator } from 'react-router';

interface ProdCardProps {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  category: string;
  price: number;
  description: string;
  image: string;
}

const ProdCard = React.memo((props: ProdCardProps): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <div className="container">
      <div className="card">
          <div className="card-image">
              <img src={props.image} />
          </div>
          <div className="card-content">
              <h2>({props.id}) {props.name}</h2>
              <p>{props.description}</p>
              <p>{props.category}</p>
              <p className="price">R$ {props.price}</p>
          </div>
          <div className="card-button">
              <button className="edit-button">Editar</button>
              <button className="delete-button" onClick={handleOpenModal}>Excluir</button>
          </div>
        </div>
        <Modal 
        isOpen={isOpen} 
        onClose={handleCloseModal} 
        text="Tem certeza que deseja excluir este produto?" 
        title="Excluir Produto" 
        icon="lucide:trash" 
        values={props.id} 
        modalAction={() => {
          props.onDelete(props.id);
          setIsOpen(false);
        }} />
    </div>
  );
});

export default ProdCard;