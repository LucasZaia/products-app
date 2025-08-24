import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import ImportProd from '../pages/import/import_prod';
import React from 'react';

const renderWithRouter = (route: any) => {
    const router = createMemoryRouter([route], {initialEntries: ['/importar-produtos']});
    return render(<RouterProvider router={router} />);
};

describe('ImportProd', () => {
    it('should render import products page', () => {
        renderWithRouter({
            path: '/importar-produtos',
            element: <ImportProd />,
        });

        expect(screen.getByText('Importar Produtos')).toBeInTheDocument();
        expect(screen.getByText('Importe um arquivo CSV com os produtos')).toBeInTheDocument();
    });

    it('should render file upload component', () => {
        renderWithRouter({
            path: '/importar-produtos',
            element: <ImportProd />,
        });

        expect(screen.getByText('Carregar Arquivo')).toBeInTheDocument();
    });

    it('should have correct CSS classes', () => {
        renderWithRouter({
            path: '/importar-produtos',
            element: <ImportProd />,
        });

        const container = screen.getByText('Importar Produtos').closest('.import-prod-container');
        expect(container).toBeInTheDocument();
    });
});
