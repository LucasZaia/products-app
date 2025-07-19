import React from 'react';
import './not_found.css';
import notFound from '../../assets/img/not_found.png';

export default function NotFound(): React.ReactElement {
    return (
        <div className="not-found-container">
            <img className="not-found-image" src={notFound} alt="Not Found" />
            <h2>Ops! Produto não encontrado.</h2>
        </div>
    );
}