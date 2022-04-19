import {
    render,
    screen,
    waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App, { Product } from './App';

const DATA: Product[] = [
    {
        id: '1',
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
            'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        rating: { rate: 3.9, count: 120 },
    },
    {
        id: '2',
        title: 'Mens Casual Premium Slim Fit T-Shirts ',
        price: 22.3,
        description:
            'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
        rating: { rate: 4.1, count: 259 },
    },
    {
        id: '3',
        title: 'Mens Cotton Jacket',
        price: 55.99,
        description:
            'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
        rating: { rate: 4.7, count: 500 },
    },
    {
        id: '4',
        title: 'Mens Casual Slim Fit',
        price: 15.99,
        description:
            'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
        category: "men's clothing",
        image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
        rating: { rate: 2.1, count: 430 },
    },
    {
        id: '5',
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description:
            "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        category: 'jewelery',
        image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
        rating: { rate: 4.6, count: 400 },
    },
];

describe('App', () => {
    const unmockedFetch = global.fetch;

    beforeEach(() => {
        global.fetch = jest.fn((url: string, config: any) =>
            Promise.resolve({
                json: () => Promise.resolve(DATA),
            })
        ) as jest.Mock;
    });

    afterAll(() => {
        global.fetch = unmockedFetch;
    });

    it('shows a loader when fetching data', async () => {
        render(<App />);
        expect(screen.getByText('Loading Products...')).toBeInTheDocument();

        expect(
            await screen.findByText('Mens Cotton Jacket')
        ).toBeInTheDocument();
    });

    it('filters results', async () => {
        render(<App />);
        await waitForElementToBeRemoved(() =>
            screen.queryByText('Loading Products...')
        );
        const searchBar: HTMLElement = await screen.findByTestId('searchBar');

        const productContainer: HTMLElement[] = await screen.findAllByTestId(
            'productContainer'
        );

        // does not fire when <= 3 characters
        userEvent.type(searchBar, 'fja');
        expect(productContainer).toHaveLength(DATA.length);

        // add 2 more characters and should filter by fjall
        userEvent.type(searchBar, 'll');
        const filteredProductContainer: HTMLElement[] =
            await screen.findAllByTestId('productContainer');
        expect(filteredProductContainer).toHaveLength(1);

        // clearing search should show all items
        userEvent.clear(searchBar);
        const allProducts: HTMLElement[] = await screen.findAllByTestId(
            'productContainer'
        );

        expect(allProducts).toHaveLength(DATA.length);
    });

    it('only shows a rating if it is greater than or equal to 3', async () => {
        render(<App />);
        await waitForElementToBeRemoved(() =>
            screen.queryByText('Loading Products...')
        );

        const dataWithGoodRating: Product[] = DATA.filter(
            (item: Product) => item.rating.rate >= 3
        );

        const dataWithGoodRatingInDOM: HTMLElement[] =
            await screen.findAllByTestId('rating');

        expect(dataWithGoodRatingInDOM).toHaveLength(dataWithGoodRating.length);
    });
});
