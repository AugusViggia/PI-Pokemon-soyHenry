import CardsContainer from "./CardsContainer/CardsContainer";
import SearchBar from "./Search Bar/SearchBar";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, searchPokemon, setLoading} from "../../redux/actions";
import style from './Home.module.css';
import Filter from "./Filter/Filter";
import Loading from "./Loading/Loading";
import { Link } from "react-router-dom";

const Home = () => {
    const loading = useSelector((state) => state.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(getPokemons());
    }, [dispatch]);

    const handleSearch = (name) => {
        dispatch(searchPokemon(name));
    };

    return (
        <div className={style.home}>
            <h2 className={style.pokedex}>PokeDeX!</h2>
            <div className={style.navBar}>
                <SearchBar onSearch={handleSearch}/>
                <Link to="/form" className={style.buttonForm}>PokéMoN! CREATOR</Link>
            </div>
            <Filter/>
            {loading ? (
                <Loading />
            ) : (
                <CardsContainer />
            )}
        </div>
    )
};

export default Home;