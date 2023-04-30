import Card from '../Cards/Cards';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Page from '../Paginated/Page';
import style from './CardsContainer.module.css';

const CardsContainer = () => {
  const pokemons = useSelector(state => state.pokemons);

  const filterByType = useSelector(state => state.filterByType);
  const filterByOrigin = useSelector(state => state.filterByOrigin);
  const orderByName = useSelector((state) => state.orderByName);
  const orderByAttack = useSelector((state) => state.orderByAttack);
  const order = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [charactersPerPage, setcharactersPerPage] = useState(12);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  const filteredPokemons = pokemons.filter(pokemon => {
    if (filterByType === 'all') {
      return true;
    } else {
      const types = [...pokemon.types, ...pokemon.types.map(type => type.name)];
      return types.includes(filterByType);
    }
  });

  const filteredByOriginPokemons = filterByOrigin === 'all'
  ? filteredPokemons
  : filteredPokemons.filter(pokemon => {
    if (filterByOrigin === 'data base') {
      return isNaN(pokemon.id);
    } else if (filterByOrigin === 'api') {
      return pokemon.id <= 100;
    } else {
      return true;
    }
  });
  
  const sortedPokemons = filteredByOriginPokemons.sort((a, b) => {
    if (orderByName === "name") {
      if (order === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    } 
  });

  const sortedByAttack = sortedPokemons.sort((a, b) => {
    if (orderByAttack === "attack") {
      if (order === "asc") {
        return a.attack - b.attack;
      } else {
        return b.attack - a.attack;
      }
    } else {
      return 0;
    }
  });

  const currentCharacters = sortedByAttack.slice(indexOfFirstCharacter, indexOfLastCharacter);

  return (
    <div className={style.cardsContainer}>
      <div className={style.pageDiv}>
        <Page charactersPerPage={charactersPerPage}
              pokemons={filteredByOriginPokemons}
              paginated={paginated}
        />
      </div>
      <div className={style.cards}>
          {currentCharacters?.map(pokemon => {
              return (
                  <div key={pokemon.id} className={style.cardDiv}>
                      <Card
                          key={pokemon.id}
                          id={pokemon.id}
                          image={pokemon.image}
                          name={pokemon.name}
                          types={pokemon.types}
                          attack={pokemon.attack}
                      />
                  </div>
              )
          })}
      </div>
    </div>
  )
};

export default CardsContainer;