import React from 'react';
import './search.css';


interface SearchProps {
    query: string;
    onSearch: (search: string) => void;
    onCategory: (category: string) => void;
}


export default function Search(props: SearchProps): React.ReactElement {

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { onSearch } = props;
        onSearch(e.target.value);
    }

    const handleCategory = (category: string) => {
        const { onCategory } = props;
        onCategory(category);
    }

    return (
        <div className="search-container">
            <div className="search-input">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                <input type="text" placeholder="Busque por um produto" value={props.query} onChange={handleSearch} />
            </div>

            <div className="search-category">
                <button onClick={() => handleCategory('Todos')}>Todos</button>
                <button onClick={() => handleCategory('Eletrônicos')}>Eletrônicos</button>
                <button onClick={() => handleCategory('Celulares')}>Celulares</button>
                <button onClick={() => handleCategory('Notebooks')}>Notebooks</button>
                <button onClick={() => handleCategory('Acessórios')}>Acessórios</button>
            </div>
        </div>
    );
}