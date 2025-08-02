
import React from 'react';
import './prod_card.css';


interface ProdCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

const ProdCard = React.memo((props: ProdCardProps): React.ReactElement => {
  return (
    <div className="container">
      <div className="card">
          <div className="card-image">
              <img src={props.image} />
          </div>
          <div className="card-content">
              <h2>({props.id}) {props.name}</h2>
              <p>{props.category}</p>
              <p className="price">R$ {props.price}</p>
          </div>
          <div className="card-button">
              <button className="edit-button">Editar</button>
              <button className="delete-button">Excluir</button>
          </div>
        </div>
    </div>
  );
});

export default ProdCard;