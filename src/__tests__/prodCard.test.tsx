import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import ProdCard from '../components/prodCard/prod_card';
import React from 'react';

const renderWithRouter = (component: React.ReactElement) => {
    const router = createMemoryRouter([
        {
            path: '/',
            element: component,
        }
    ], {initialEntries: ['/']});
    return render(<RouterProvider router={router} />);
};

describe('ProdCard', () => {
    const mockProps = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        category: 'Electronics',
        price: 99.99,
        image: 'test-image.jpg',
        onDelete: jest.fn(),
    };

    it('should render product information', () => {
        renderWithRouter(<ProdCard {...mockProps} />);

        expect(screen.getByText('(1) Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('R$ 99.99')).toBeInTheDocument();
    });

    it('should render product image', () => {
        renderWithRouter(<ProdCard {...mockProps} />);

        const image = screen.getByAltText('Test Product');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    it('should render edit and delete buttons', () => {
        renderWithRouter(<ProdCard {...mockProps} />);

        expect(screen.getByText('Editar')).toBeInTheDocument();
        expect(screen.getByText('Excluir')).toBeInTheDocument();
    });

    it('should call onDelete when delete button is clicked', () => {
        renderWithRouter(<ProdCard {...mockProps} />);

        const deleteButton = screen.getByText('Excluir');
        fireEvent.click(deleteButton);

        expect(screen.getByText('Tem certeza que deseja excluir este produto?')).toBeInTheDocument();
    });

    it('should use default image when image prop is not provided', () => {
        const propsWithoutImage = { ...mockProps, image: '' };
        renderWithRouter(<ProdCard {...propsWithoutImage} />);

        const image = screen.getByAltText('Test Product');
        expect(image).toBeInTheDocument();
    });
});
