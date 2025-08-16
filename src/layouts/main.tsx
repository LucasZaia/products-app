import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Menu from '../components/menu/menu';
import { createAllProducts } from '../data/Products/create_all';

import './main.css';

const Main = () => {
  
  return (
    <div className="main-layout">
      <Menu />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;