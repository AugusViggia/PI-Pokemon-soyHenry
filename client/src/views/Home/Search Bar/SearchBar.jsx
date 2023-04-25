import { useState } from "react";
import style from './SearchBar.module.css';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    };

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="{style.searchDiv}">
            <input className="{style.input}" onChange={handleInputChange} placeholder="Search by name..." type="text" value={searchTerm}></input>
            <button className="{style.button}" type="submit">Search</button>
        </form>
    )
};

export default SearchBar;