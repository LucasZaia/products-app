import { render, screen, act } from '@testing-library/react';
import ProdList from '../pages/prod_list';
import React from 'react';
import { ProductList } from '../interfaces/products_list';
import { createMemoryRouter, RouterProvider } from 'react-router';

const renderWithRouter = async (route: any) => {
    const router = createMemoryRouter([route], {initialEntries: ['/produtos']});
    let result;
    await act(async () => {
        result = render(<RouterProvider router={router} />);
    });
    return result!;
}

describe('ProdList', () => {
  const loaderData: ProductList[] = [
    { id: 1, name: 'Iphone 15 Pro Max', description: 'Description 1', price: 10, category: 'Category 1', pictureUrl: 'url1' },
    { id: 2, name: 'MacBook Pro 14', description: 'Description 2', price: 20, category: 'Category 2', pictureUrl: 'url2' },
    { id: 3, name: 'TV 4K Samsung', description: 'Description 3', price: 30, category: 'Category 3', pictureUrl: 'url3' },
    { id: 4, name: 'Iphone 16', description: 'Description 4', price: 40, category: 'Category 4', pictureUrl: 'url4' },
    { id: 5, name: 'Amazon Alexa', description: 'Description 5', price: 50, category: 'Category 5', pictureUrl: 'url5' },
    { id: 6, name: 'Suporte para controle de PlayStation', description: 'Description 6', price: 60, category: 'Category 6', pictureUrl: 'url6' },
    { id: 7, name: 'Suporte para controle de Xbox', description: 'Description 7', price: 70, category: 'Category 7', pictureUrl: 'url7' },
  ];

  it('should render product list', async () => {
    await renderWithRouter({
        path: '/produtos',
        element: <ProdList />,
        loader: () => loaderData,
        HydrateFallback: () => <div>Loading...</div>,
    });

    expect(screen.getByText('(1) Iphone 15 Pro Max')).toBeDefined();
    expect(screen.getByText('(2) MacBook Pro 14')).toBeDefined();
    expect(screen.getByText('(3) TV 4K Samsung')).toBeDefined();
    expect(screen.getByText('(4) Iphone 16')).toBeDefined();
    expect(screen.getByText('(5) Amazon Alexa')).toBeDefined();
    expect(screen.getByText('(6) Suporte para controle de PlayStation')).toBeDefined();
    expect(screen.getByText('(7) Suporte para controle de Xbox')).toBeDefined();
  });

  it('should render empty state when no products', async () => {
    await renderWithRouter({
        path: '/produtos',
        element: <ProdList />,
        loader: () => [],
        HydrateFallback: () => <div>Loading...</div>,
    });

    expect(screen.getByText('Ops! Produto não encontrado.')).toBeDefined();
  });
});
