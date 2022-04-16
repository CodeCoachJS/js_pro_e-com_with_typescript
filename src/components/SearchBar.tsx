import { ChangeEvent } from 'react';

interface SearchBarProps {
    placeholder: string;
    onChangeCallBack: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
    placeholder,
    onChangeCallBack,
}: SearchBarProps): JSX.Element => {
    return <input placeholder={placeholder} onChange={onChangeCallBack} />;
};

export default SearchBar;
