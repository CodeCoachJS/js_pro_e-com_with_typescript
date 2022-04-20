import { ChangeEvent } from 'react'; // HINT: 🤔

interface SearchBarProps {
    placeholder: string;
    onChangeCallBack: any; // FIXME -> look above at that hint up there...;
}

const SearchBar = ({
    placeholder,
    onChangeCallBack,
}: SearchBarProps): JSX.Element => {
    return (
        <input
            data-testid="searchBar"
            placeholder={placeholder}
            onChange={onChangeCallBack}
        />
    );
};

export default SearchBar;
