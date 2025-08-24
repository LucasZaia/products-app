import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import EditProd from '../pages/edit_prod/edit';
import React from 'react';
import { Product } from '../interfaces/products';

const renderWithRouter = (route: any) => {
    const router = createMemoryRouter([route], {initialEntries: ['/editar-produto/1']});
    return render(<RouterProvider router={router} />);
};

describe('EditProd', () => {
    const mockProduct: Product = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Electronics',
        pictureUrl: 'test-image.jpg'
    };

    it('should render edit product page', () => {
        renderWithRouter({
            path: '/editar-produto/:id',
            element: <EditProd />,
            loader: () => ({ product: mockProduct }),
        });

        expect(screen.getByText('Editar detalhes do Produto')).toBeInTheDocument();
    });

    it('should render form fields with product data', () => {
        renderWithRouter({
            path: '/editar-produto/:id',
            element: <EditProd />,
            loader: () => ({ product: mockProduct }),
        });

        expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
        expect(screen.getByDisplayValue('99.99')).toBeInTheDocument();
    });

    it('should render submit and cancel buttons', () => {
        renderWithRouter({
            path: '/editar-produto/:id',
            element: <EditProd />,
            loader: () => ({ product: mockProduct }),
        });

        expect(screen.getByText('Enviar')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });
});
