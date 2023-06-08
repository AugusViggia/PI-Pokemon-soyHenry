import Card from '../Cards/Cards';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import Page from '../Paginated/Page';
import style from './CardsContainer.module.css';
import { resetFilterByAttack, resetFilterByName, resetFilterByOrigin, resetFilterByType, resetOrder } from '../../../redux/actions';

const CardsContainer = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);

  const filterByType = useSelector(state => state.filterByType);
  const filterByOrigin = useSelector(state => state.filterByOrigin);
  const orderByName = useSelector((state) => state.orderByName);
  const orderByAttack = useSelector((state) => state.orderByAttack);
  const order = useSelector((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [charactersPerPage, setcharactersPerPage] = useState(12);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect(() => {
    dispatch(resetFilterByType('all'));
    dispatch(resetFilterByOrigin('all'));
    dispatch(resetFilterByName('all'));
    dispatch(resetFilterByAttack('all'));
    dispatch(resetOrder('asc'));
  }, [dispatch]);
  
  useEffect(() => {
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
            return pokemon.id <= 1200;
          } else {
            return true;
          }
      });

    // eslint-disable-next-line
    const sortedPokemons = filteredByOriginPokemons.sort((a, b) => {
      if (orderByName === "name") {
        if (order === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      } 
    }).sort((a, b) => {
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

    setFilteredPokemons(sortedPokemons);
  }, [pokemons, filterByType, filterByOrigin, orderByName, orderByAttack, order]);


  const currentCharacters = filteredPokemons.slice(indexOfFirstCharacter, indexOfLastCharacter);

    useEffect(() => {
    if (currentCharacters.length === 0 && filteredPokemons.length > 0) {
      const newPage = Math.ceil(filteredPokemons.length / charactersPerPage);
      setCurrentPage(newPage);
    }
  }, [currentCharacters, filteredPokemons, charactersPerPage]);

  return (
    <div className={style.cardsContainer}>
      <div className={style.pageDiv}>
        <Page charactersPerPage={charactersPerPage}
              pokemons={filteredPokemons}
              paginated={paginated}
        />
      </div>
      <div className={style.cards}>
        {currentCharacters?.map(pokemon => {
          const capitalizedFirstLetter = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

          return (
              <div key={pokemon.id} className={style.cardDiv}>
                  <Card
                      key={pokemon.id}
                      id={pokemon.id}
                      image={pokemon.image}
                      name={capitalizedFirstLetter}
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