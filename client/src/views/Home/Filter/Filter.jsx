import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTypes, filterByTypes, filterByOrigin, setOrder, getPokemons} from "../../../redux/actions";


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
            dispatch(setOrder({ orderByAttack: null, order: null }));
            dispatch(getPokemons()); // obtener los pokemons nuevamente
        } else {
            dispatch(setOrder({ orderByAttack: 'attack', order: orderValue }));
        }
    }

    return (
        <div>
            <div>
                <label htmlFor="type">Filter by Type: </label>
                <select defaultValue={filter} onChange={handleChange}>
                    <option value="all">--</option>
                    {pokemonTypes?.map(type => {
                        return <option
                            value={type.name}
                            key={type.id}>
                            {type.name}</option>
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="origin">Filter by Origin: </label>
                <select defaultValue={origin} onChange={handleOrigin}>
                    <option value='all'>--</option>
                    <option value='data base'>Data Base</option>
                    <option value='api'>API</option>
                </select>
            </div>
            <div>
                <label htmlFor="sort">Sort by: </label>
                <select defaultValue='all' onChange={handleOrder}>
                    <option value="all">--</option>
                    <option value="name-asc">Name ▲</option>
                    <option value="name-desc">Name ▼</option>
                </select>
            </div>
            <div>
                <select defaultValue='all' onChange={handleAttack}>
                    <option value="all">--</option>
                    <option value="attack-asc">Attack ▲</option>
                    <option value="attack-desc">Attack ▼</option>
                </select>
            </div>
        </div>
    )
};

export default Filter;