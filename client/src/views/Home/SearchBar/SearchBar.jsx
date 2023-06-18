import { useState } from "react";
import style from './SearchBar.module.css';
import { searchPokemon } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const SearchBar = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
        setInput(event.target.value);
        console.log(event.target.value);
    };

    const handleSearch = () => {
        dispatch(searchPokemon(input));
    };

    return (
        <form className={style.searchForm}>
            <input className={style.input} onChange={handleInputChange} placeholder="Search by name..." type="text" value={input}></input>
            <button className={style.button} type="button" onClick={handleSearch}>SEARCH</button>
        </form>
    )
};

export default SearchBar;