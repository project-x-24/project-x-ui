import { SearchIcon } from '../icons';

const SearchBar = props => {
    const {
        searchValue,
        handleChange,
        placeholder = 'Search',
        customClass = 'p-2 h-[38px]',
        searchInputStyle = 'bg-white',
        wrapperStyle = 'bg-white border-purple9',
    } = props;
    return (
        <div
            className={`flex items-center min-w-[120px] ${customClass}
                  rounded-md border-[1px] ${wrapperStyle}`}>
            <SearchIcon />
            <input
                type="text"
                value={searchValue}
                placeholder={placeholder}
                onChange={e => handleChange(e.target.value)}
                className={`overflow-hidden pl-2 w-full h-full text-sm
                    placeholder:text-slateGrey rounded-md outline-none ${searchInputStyle}`}
            />
        </div>
    );
};

export default SearchBar;