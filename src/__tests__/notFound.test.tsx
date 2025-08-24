import { render, screen } from '@testing-library/react';
import NotFound from '../pages/not_found/not_found';
import React from 'react';

describe('NotFound', () => {
    it('should render not found message', () => {
        render(<NotFound />);
        
        expect(screen.getByText('Ops! Produto não encontrado.')).toBeInTheDocument();
    });

    it('should render not found image', () => {
        render(<NotFound />);
        
        const image = screen.getByAltText('Not Found');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src');
    });

    it('should have correct CSS classes', () => {
        render(<NotFound />);
        
        const container = screen.getByText('Ops! Produto não encontrado.').parentElement;
        expect(container).toHaveClass('not-found-container');
        
        const image = screen.getByAltText('Not Found');
        expect(image).toHaveClass('not-found-image');
    });
});
