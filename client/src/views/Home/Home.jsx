import CardsContainer from "./CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPokemons } from "../../redux/actions";
import style from './Home.module.css';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    return (
        <div className={style.home}>
            <h2>Home Page</h2>
            <CardsContainer/>
        </div>
    )
};

export default Home;