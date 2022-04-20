import { ChangeEvent, useEffect, useState } from 'react';
import { apiClient, HTTP_OPTIONS } from './helpers';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import './App.css';
import ProductRating from './components/ProductRating';

export interface Product {} // FIXME -> ruh roh, we need a definition for this interface

const App = (): JSX.Element => {
    const [products, setProducts] = useState<any[] | []>([]); // FIXME -> replace `any` with the actual type expected
    const [filteredProducts, setFilteredProducts] = useState<any[] | []>([]); // FIXME -> replace `any` with the actual type expected
    const [loading, setIsLoading] = useState<any>(false); // FIXME -> replace `any` with the actual type expected
    const API_URL: string = 'https://fakestoreapi.com/products';

    const fetchProducts = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const res: Product[] = await apiClient(API_URL, {
                method: HTTP_OPTIONS.GET,
            });
            // we keep both filtered products and the entire list separately
            // this way we can update the list and keep a full copy in case we need to reset it
            setFilteredProducts(res);
            setProducts(res);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filterItems = (e: ChangeEvent<HTMLInputElement>): void => {
        const inputVal = e.target.value;
        // FIXME -> if there is no value entered then let's show the entire list
        // if there are MORE than or EQUAL to 3 characters we will filter the list by the title property
    };

    return (
        <div className="App">
            <header className="App-header">
                <SearchBar
                    placeholder="Search For an Item"
                    onChangeCallBack={filterItems}
                />
                {loading && <h2>Loading Products...</h2>}
                {filteredProducts.map((product: Product) => (
                    <div data-testid="productContainer" key={product.id}>
                        <ProductCard {...product} />
                        <ProductRating
                            rate={product.rating.rate}
                            count={product.rating.count}
                        />
                    </div>
                ))}
            </header>
        </div>
    );
};

export default App;
