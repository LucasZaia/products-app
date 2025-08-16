import React, { useState } from 'react';
import './search.css';
import { fixedCategorys } from '../../consts/fixed_categorys';

interface SearchProps {
    query: string;
    onSearch: (search: string) => void;
    onCategory: (category: string) => void;
}

export default function Search(props: SearchProps): React.ReactElement<SearchProps> {

    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    // const handleSearch = () => {
    //     props.onSearch(search);
    // }

    // const inputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setSearch(e.target.value);
    //     handleSearch();

    // }

    const handleCategory = (category: string) => {
        const { onCategory } = props;
        setActiveCategory(category);
        onCategory(category);
    }

    const categories = ['Todos', ...fixedCategorys];

    return (
        <div className="search-container-wrapper">  
            <div className="search-container">
                <div className="search-input">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                    <input type="text" id="search-input" placeholder="Busque por um produto" onChange={(e) => props.onSearch(e.target.value)}/>
                </div>
                {/* <div className="search-filter"> 
                    <button className="search-button" onClick={handleSearch}>
                        Filtrar
                    </button>
                </div> */}
            </div>
            <div className="search-category">
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => handleCategory(category)} 
                        style={{ 
                            backgroundColor: activeCategory === category ? '#1d6ee9' : '#ffffff', 
                            color: activeCategory === category ? '#ffffff' : '#000000' 
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}