import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import AddProd from '../pages/add_prod/add_prod';
import React from 'react';

const renderWithRouter = (route: any) => {
    const router = createMemoryRouter([route], {initialEntries: ['/cadastro-produto']});
    return render(<RouterProvider router={router} />);
};

describe('AddProd', () => {
    it('should render add product page', () => {
        renderWithRouter({
            path: '/cadastro-produto',
            element: <AddProd />,
        });

        expect(screen.getByText('Cadastro de Produto')).toBeInTheDocument();
    });

    it('should render form fields', () => {
        renderWithRouter({
            path: '/cadastro-produto',
            element: <AddProd />,
        });

        expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
        expect(screen.getByLabelText('Descrição:')).toBeInTheDocument();
        expect(screen.getByLabelText('Preço:')).toBeInTheDocument();
        expect(screen.getByLabelText('Categoria:')).toBeInTheDocument();
    });

    it('should render submit and cancel buttons', () => {
        renderWithRouter({
            path: '/cadastro-produto',
            element: <AddProd />,
        });

        expect(screen.getByText('Enviar')).toBeInTheDocument();
        expect(screen.getByText('Cancelar')).toBeInTheDocument();
    });
});
