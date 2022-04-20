import { currencyFormat } from '../helpers';

interface ProductProps {} // FIXME -> ruh roh, we need a definition for this interface

const ProductCard = ({
    id,
    title,
    price,
    image,
    description,
}: ProductProps): JSX.Element => {
    return (
        <div key={id}>
            <h1>{title}</h1>
            <p>{currencyFormat(price)}</p>
            <img width="100" src={image} alt={title} />
            <p>{description}</p>
        </div>
    );
};

export default ProductCard;
