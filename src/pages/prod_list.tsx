import React, { useState } from 'react';
import ProdCard from '../components/prodCard/prod_card';
import Search from '../components/search/search';
import NotFound from './not_found/not_found';
import { useLoaderData } from 'react-router';

export default function ProdList(): React.ReactElement {

    const prodList = useLoaderData() as { id: number, name: string, category: string, price: number, image: string }[];

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    console.log(prodList);

      const filteredProdListByCategory = () => {
        if (category === 'Todos') {
            return prodList;
        } else {
            return prodList.filter((prod) => prod.category.toLowerCase().includes(category.toLowerCase())) || [];
        }
    }

    const filteredProdList = () => {
        const query = search.toLowerCase().trim();

        return filteredProdListByCategory().filter((prod) => 
            prod.id.toString().includes(query) ||
            prod.name.toLowerCase().includes(query) ||
            prod.category.toLowerCase().includes(query) ||
            prod.price.toString().includes(query)
        ) || [];
    }

    return (
        <div>
            <Search query={search} onSearch={setSearch} onCategory={setCategory} />
            
            {filteredProdList().map((prod) => (
                <ProdCard 
                key={prod.id} 
                id={prod.id.toString()} 
                name={prod.name} 
                category={prod.category} 
                price={prod.price} 
                image={prod.image} />
            ))}

            {filteredProdList().length === 0 && <NotFound />}
        </div>
    );
 }