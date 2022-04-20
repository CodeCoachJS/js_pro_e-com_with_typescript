export enum HTTP_OPTIONS { // FIXME -> looks like we are missing an enum here
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

interface FetchParams {
    method?: HTTP_OPTIONS | HTTP_OPTIONS.GET;
    data?: object;
}

const currencyFormat = (num) => {
    // FIXME -> what type should `num` have and what is returned?
    return `$${num.toFixed(2)}`;
};

const apiClient = async (
    url: string,
    config: FetchParams = {}
): Promise<any> => {
    try {
        const res = await window.fetch(url, config);
        const json = await res.json();
        return json;
    } catch (e) {
        throw e;
    }
};

export { currencyFormat, apiClient };
