import CardsContainer from "./CardsContainer/CardsContainer";
import SearchBar from "./Search Bar/SearchBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons, searchPokemon, } from "../../redux/actions";
import style from './Home.module.css';
import Filter from "./Filter/Filter";

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    const handleSearch = (name) => {
        dispatch(searchPokemon(name));
    };

    return (
        <div className={style.home}>
            <h2>Home Page</h2>
            <SearchBar onSearch={handleSearch} />
            <Filter />
            <CardsContainer/>
        </div>
    )
};

export default Home;