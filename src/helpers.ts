const currencyFormat = (num: number): string => {
    return `$${num}.fixed(2)`;
};

export { currencyFormat };
