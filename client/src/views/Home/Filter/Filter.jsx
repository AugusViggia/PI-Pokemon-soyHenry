import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterByTypes, filterByOrigin, setOrder, getPokemons, setAttack} from "../../../redux/actions";
import style from './Filter.module.css';

const Filter = () => {
    const pokemonTypes = useSelector((state) => state.types);
    const filter = useSelector((state) => state.filterByType);
    const origin = useSelector((state) => state.filterByOrigin);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    }, []);

    const handleChange = (event) => {
        const type = event.target.value;
        dispatch(filterByTypes(type));
    };

    const handleOrigin = (event) => {
        const origin = event.target.value;
        dispatch(filterByOrigin(origin));
    };

    const handleOrder = (event) => {
        const [orderByValue, orderValue] = event.target.value.split('-');

        if (event.target.value === 'all') {
            dispatch(setOrder({ orderByName: null, order: null }));
            dispatch(getPokemons()); // obtener los pokemons nuevamente
        } else {
            dispatch(setOrder({ orderByName: 'name', order: orderValue }));
        }
    };

    const handleAttack = (event) => {
        const [orderByValue, orderValue] = event.target.value.split('-');

        if (event.target.value === 'all') {
            dispatch(setAttack({ orderByAttack: null, order: null }));
            dispatch(getPokemons()); // obtener los pokemons nuevamente
        } else {
            dispatch(setAttack({ orderByAttack: 'attack', order: orderValue }));
        }
    }

    return (
        <div className={style.filterContainer}>
            <div className={style.filter}>
                <label htmlFor="type" className={style.typeFilter}>Filter by Type: </label>
                <select defaultValue={filter} onChange={handleChange} className={style.select}>
                    <option value="all">--</option>
                    {pokemonTypes?.map(type => {
                        return <option
                            value={type.name}
                            key={type.id}
                            className={style.option}>
                            {type.name}</option>
                    })}
                </select>
            </div>
            <div className={style.filter}>
                <label htmlFor="origin" className={style.originFilter}>Filter by Origin: </label>
                <select defaultValue={origin} onChange={handleOrigin} className={style.select}>
                    <option value='all' className={style.option}>--</option>
                    <option value='data base' className={style.option}>Data Base</option>
                    <option value='api' className={style.option}>API</option>
                </select>
            </div>
            <div className={style.filter}> 
                <label htmlFor="sort" className={style.orderFilter}>Sort by Name: </label>
                <select defaultValue='all' onChange={handleOrder} className={style.select}>
                    <option value="all" className={style.option}>--</option>
                    <option value="name-asc" className={style.option}>Name ▲</option>
                    <option value="name-desc" className={style.option}>Name ▼</option>
                </select>
            </div>
            <div className={style.filter}>
                <label htmlFor="sort" className={style.attackFilter}>Sort by Attack: </label>
                <select defaultValue='all' onChange={handleAttack} className={style.select}>
                    <option value="all" className={style.option}>--</option>
                    <option value="attack-asc" className={style.option}>Attack ▲</option>
                    <option value="attack-desc" className={style.option}>Attack ▼</option>
                </select>
            </div>
        </div>
    )
};

export default Filter;