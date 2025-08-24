import React, { FC, useState } from 'react';
import './modal.css';
import { Icon } from '@iconify/react';
import ButtonAction from '../ui/button/buttonAction';

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
                    <ButtonAction onClick={handleCloseModal} text="Fechar" type="primary" format="small" border="rounded" submit={true} />
                    <ButtonAction onClick={modalAction} text="Excluir" type="secondary" format="small" border="rounded" submit={false} />
                </div>
            </div>
        </div>
    )
}

export default Modal;