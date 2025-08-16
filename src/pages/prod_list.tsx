import React, { use, useEffect, useMemo, useState } from 'react';
import ProdCard from '../components/prodCard/prod_card';
import Search from '../components/search/search';
import NotFound from './not_found/not_found';
import { useLoaderData } from 'react-router';
import { ProductList } from '../interfaces/products_list';

export default function ProdList(): React.ReactElement {

    const prodList = useLoaderData() as { id: number, name: string, description: string, price: number, category: string, pictureUrl: string }[];

    const prodListMemo = useMemo(() => prodList, [prodList]);

    const [filteredProducts, setFilteredProducts] = useState<ProductList[]>([]);

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

      const filteredProdListByCategory = () => {
        if (category === 'Todos') {
            return prodListMemo;
        } else {
            return prodListMemo.filter((prod) => prod.category.toLowerCase().includes(category.toLowerCase())) || [];
        }
    }

    const filteredProdList = (filteredProducts: ProductList[]) => {
        const query = search.toLowerCase().trim();

        return filteredProducts.filter((prod) => 
            prod.id.toString().includes(query) ||
            prod.name.toLowerCase().includes(query) ||
            prod.category.toLowerCase().includes(query) ||
            prod.price.toString().includes(query)
        ) || [];
    }

    useEffect(() => {
      setFilteredProducts(filteredProdListByCategory());
      const interval = setTimeout(() => {
        setFilteredProducts(filteredProdList(filteredProdListByCategory()));
      }, 500);
      return () => clearTimeout(interval);
    }, [search, category]);

    return (
        <div>
            <Search query={search} onSearch={setSearch} onCategory={setCategory} />
            
            {filteredProducts.map((prod) => (
                <ProdCard 
                key={prod.id} 
                id={prod.id.toString()} 
                description={prod.description}
                name={prod.name} 
                category={prod.category} 
                price={prod.price} 
                image={prod.pictureUrl} />
            ))}

            {filteredProducts.length === 0 && <NotFound />}
        </div>
    );
 }