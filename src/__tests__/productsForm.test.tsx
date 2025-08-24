import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import ProductsForm from '../components/form/products';
import React from 'react';
import { Product } from '../interfaces/products';

const renderWithRouter = (component: React.ReactElement) => {
    const router = createMemoryRouter([
        {
            path: '/',
            element: component,
        }
    ], {initialEntries: ['/']});
    return render(<RouterProvider router={router} />);
};

describe('ProductsForm', () => {
    const mockProduct: Product = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        category: 'Electronics',
        pictureUrl: 'test-image.jpg'
    };

    describe('Create mode', () => {
        it('should render create form title', () => {
            renderWithRouter(<ProductsForm type="create" />);

            expect(screen.getByText('Cadastro de Produto')).toBeInTheDocument();
        });

        it('should render all form fields', () => {
            renderWithRouter(<ProductsForm type="create" />);

            expect(screen.getByLabelText('Nome:')).toBeInTheDocument();
            expect(screen.getByLabelText('Descrição:')).toBeInTheDocument();
            expect(screen.getByLabelText('Preço:')).toBeInTheDocument();
            expect(screen.getByLabelText('Categoria:')).toBeInTheDocument();
        });

        it('should render submit and cancel buttons', () => {
            renderWithRouter(<ProductsForm type="create" />);

            expect(screen.getByText('Enviar')).toBeInTheDocument();
            expect(screen.getByText('Cancelar')).toBeInTheDocument();
        });

        it('should have correct form action for create', () => {
            renderWithRouter(<ProductsForm type="create" />);

            const form = screen.getByRole('form') || document.querySelector('form');
            expect(form).toHaveAttribute('action', '/cadastro-produto');
            expect(form).toHaveAttribute('method', 'post');
        });
    });

    describe('Update mode', () => {
        it('should render update form title', () => {
            renderWithRouter(<ProductsForm type="update" product={mockProduct} />);

            expect(screen.getByText('Editar detalhes do Produto')).toBeInTheDocument();
        });

        it('should populate form fields with product data', () => {
            renderWithRouter(<ProductsForm type="update" product={mockProduct} />);

            expect(screen.getByDisplayValue('Test Product')).toBeInTheDocument();
            expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
            expect(screen.getByDisplayValue('99.99')).toBeInTheDocument();
        });

        it('should have correct form action for update', () => {
            renderWithRouter(<ProductsForm type="update" product={mockProduct} />);

            const form = screen.getByRole('form') || document.querySelector('form');
            expect(form).toHaveAttribute('action', '/editar-produto/1');
            expect(form).toHaveAttribute('method', 'put');
        });
    });

    it('should render form with multipart encoding', () => {
        renderWithRouter(<ProductsForm type="create" />);

        const form = screen.getByRole('form') || document.querySelector('form');
        expect(form).toHaveAttribute('encType', 'multipart/form-data');
    });
});
