
import React, { useState } from 'react';
import './prod_card.css';
import Modal from '../modal/modal';
import { deleteProduct } from '../../data/Products/delete';
import { useRevalidator } from 'react-router';
import ButtonAction from '../ui/button/buttonAction';
import { useNavigate } from 'react-router';
import defaultImage from '../../assets/img/default.png';

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
  const navigate = useNavigate();
  
  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  const handleEdit = (id: number) => {
    navigate(`/editar-produto/${id}`);
  }

  return (
    <div className="container">
      <div className="card">
          <div className="card-image">
              <img 
                src={props.image || defaultImage} 
                alt={props.name}
                onError={(e) => {
                  e.currentTarget.src = defaultImage;
                }}
              />
          </div>
          <div className="card-content">
              <h2>({props.id}) {props.name}</h2>
              <p>{props.description}</p>
              <p>{props.category}</p>
              <p className="price">R$ {props.price}</p>
          </div>
          <div className="card-button">
              <ButtonAction onClick={() => {handleEdit(props.id)}} text="Editar" type="primary" format="small" border="rounded" />
              <ButtonAction onClick={handleOpenModal} text="Excluir" type="secondary" format="small" border="rounded" />
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