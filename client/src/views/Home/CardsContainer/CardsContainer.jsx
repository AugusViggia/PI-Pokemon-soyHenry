import Card from '../Cards/Cards';
import { useSelector } from 'react-redux';
import style from './CardsContainer.module.css';

const CardsContainer = () => {

    const pokemons = useSelector(state => state.pokemons);

    return (
        <div className={style.cardContainer}>
            {pokemons.map(pokemon => {
                return (
                    <div key={pokemon.id}>
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            image={pokemon.image}
                            name={pokemon.name}
                            types={pokemon.types}
                        />
                    </div>
                )
            })}
        </div>
    )
};

export default CardsContainer;