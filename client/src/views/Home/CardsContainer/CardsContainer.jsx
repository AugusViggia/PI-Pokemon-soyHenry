import Card from '../Cards/Cards';
import { useSelector } from 'react-redux';
import style from './CardsContainer.module.css';

const CardsContainer = () => {
    const pokemons = useSelector(state => state.pokemons);
    const filterByType = useSelector(state => state.filterByType);
    const filterByOrigin = useSelector(state => state.filterByOrigin);
    const orderBy = useSelector((state) => state.orderBy);
    const order = useSelector((state) => state.order);
    
    const filteredByType = filterByType === 'all'
        ? pokemons
        : pokemons.filter(pokemon => pokemon.types?.includes(filterByType));

    const filteredByTypeAndOrigin = filterByOrigin === 'all'
        ? filteredByType
        : filteredByType.filter(pokemon => {
            if (filterByOrigin === 'data base') {
                return pokemon.id === isNaN;
            } else if (filterByOrigin === 'api') {
                return pokemon.id < 1200;
            } else {
                return true;
            }
        });
  
      const sortedPokemons = filteredByTypeAndOrigin.sort((a, b) => {
    if (orderBy === "name") {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } else if (orderBy === "attack") {
      if (order === "asc") {
        return a.stats.attack - b.stats.attack;
      } else {
        return b.stats.attack - a.stats.attack;
      }
    } else {
      return 0;
    }
  });

    return (
        <div className={style.cardContainer}>
            {sortedPokemons.map(pokemon => {
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