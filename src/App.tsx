import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';
interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
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
            const res = await window.fetch(API_URL);
            const json = await res.json();
            setFilteredProducts(json);
            setProducts(json);
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
                    <div key={product.id}>
                        <ProductCard {...product} />
                    </div>
                ))}
            </header>
        </div>
    );
};

export default App;
