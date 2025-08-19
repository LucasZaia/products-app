import React, { FC, useState } from 'react';
import './modal.css';
import { Icon } from '@iconify/react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalAction: () => void;
    text: string;
    title: string;
    icon: string;
    values: any;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, text, title, icon, values, modalAction }) => {
    
    const handleCloseModal = () => {
        onClose();
    }

    return (
        <div className={`modal-container ${isOpen ? 'open' : 'close'}`}>
            <div className="modal-content">
                <Icon icon="lucide:x" className="modal-close" onClick={handleCloseModal} />
                <Icon icon={icon} className="modal-icon" />
                <h1 className="modal-title">{title}</h1>
                <p className="modal-text">{text}</p>
                <div className="modal-footer">
                    <button className="modal-button" onClick={handleCloseModal}>Fechar</button>
                    <button className="modal-button" onClick={(modalAction)}>Excluir</button>
                </div>
            </div>
        </div>
    )
}

export default Modal;