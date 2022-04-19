interface ProductRatingProps {
    count: number;
    rate: number;
}
const ProductRating = ({ count, rate }: ProductRatingProps): JSX.Element => {
    return (
        <div>{rate >= 3 && <p data-testid="rating">Rating: {rate} / 5</p>}</div>
    );
};

export default ProductRating;
