import React, { useState } from 'react';
import './menu.css';
import { Icon } from '@iconify/react';
import logo from '../../assets/img/react_prods_white.png';
import { Link, useLocation } from 'react-router';

const Menu = () => {
    const location = useLocation();
    const [activeItem, setActiveItem] = useState<string>(location.pathname);

    const handleItemClick = (item: string) => {
        setActiveItem(item);
    };
    
    const menuItems = [
        {
            icon: 'lucide:box',
            text: 'Produtos',
            path: '/produtos'
        },
        {
            icon: 'lucide:plus-circle',
            text: 'Cadastro',
            path: '/cadastro-produto'
        }
    ];

  return (
    <div className="menu-container">
        <div className="menu-header">
            <div className="menu-header-logo">
                <img src={logo} alt="logo" />
            </div>

            <ul className="menu-list">
                {menuItems.map((item) => (
                    <li className={`menu-item ${activeItem === item.path ? 'active' : ''}`} key={item.path} onClick={() => handleItemClick(item.path)}>
                        <Link to={item.path} className="menu-item-link">
                            <Icon icon={item.icon} className="menu-item-icon" />
                            <span className="menu-item-text">{item.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="menu-footer">
                <div className="menu-footer-item">
                    <Icon icon="lucide:log-out" className="menu-footer-item-icon" />
                    <span className="menu-footer-item-text"> <b>Sair</b></span>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Menu;