interface ProductRatingProps {} // FIXME -> ruh roh, we need a definition for this

// FIXME -> let's only show the rating if it is EQUAL to or GREATER THAN 3
const ProductRating = ({ rate }: ProductRatingProps): JSX.Element => {
    return <p data-testid="rating">Rating: {rate} / 5</p>;
};

export default ProductRating;
