import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/search/search';
import React from 'react';

describe('Search', () => {
    const mockProps = {
        query: '',
        onSearch: jest.fn(),
        onCategory: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render search input', () => {
        render(<Search {...mockProps} />);

        const searchInput = screen.getByPlaceholderText('Busque por um produto');
        expect(searchInput).toBeInTheDocument();
    });

    it('should call onSearch when input changes', () => {
        render(<Search {...mockProps} />);

        const searchInput = screen.getByPlaceholderText('Busque por um produto');
        fireEvent.change(searchInput, { target: { value: 'test search' } });

        expect(mockProps.onSearch).toHaveBeenCalledWith('test search');
    });

    it('should render category buttons', () => {
        render(<Search {...mockProps} />);

        expect(screen.getByText('Todos')).toBeInTheDocument();
        expect(screen.getByText('Todos')).toBeInTheDocument();
    });

    it('should call onCategory when category button is clicked', () => {
        render(<Search {...mockProps} />);

        const todosButton = screen.getByText('Todos');
        fireEvent.click(todosButton);

        expect(mockProps.onCategory).toHaveBeenCalledWith('Todos');
    });

    it('should highlight active category', () => {
        render(<Search {...mockProps} />);

        const todosButton = screen.getByText('Todos');
        fireEvent.click(todosButton);

        expect(todosButton).toHaveStyle({ backgroundColor: '#1d6ee9' });
    });

    it('should render search icon', () => {
        render(<Search {...mockProps} />);

        const searchIcon = document.querySelector('.lucide-search');
        expect(searchIcon).toBeInTheDocument();
    });
});
