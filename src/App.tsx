import { ChangeEvent, useEffect, useState } from 'react';
import { apiClient, HTTP_OPTIONS } from './helpers';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
import './App.css';
import ProductRating from './components/ProductRating';

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category?: string;
    image: string;
    rating: {
        count: number;
        rate: number;
    };
}

const App = (): JSX.Element => {
    const [products, setProducts] = useState<Product[] | []>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[] | []>(
        []
    );
    const [loading, setIsLoading] = useState<boolean>(false);
    const API_URL: string = 'https://fakestoreapi.com/products';

    const fetchProducts = async (): Promise<void> => {
        try {
            setIsLoading(true);
            const res: Product[] = await apiClient(API_URL, {
                method: HTTP_OPTIONS.GET,
            });
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
        if (!inputVal.length) setFilteredProducts(products);
        if (inputVal.length > 3) {
            setFilteredProducts((prev) =>
                prev.filter((item) =>
                    item.title.toLocaleLowerCase().includes(inputVal)
                )
            );
        }
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
