import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_DETAILS = "GET_DETAILS";
export const SET_POKEMON_DETAIL = "SET_POKEMON_DETAIL";
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SET_ORDER = "SET_ORDER";

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const response = (await axios(`http://localhost:3001/pokemon`)).data;

      dispatch({ type: GET_POKEMONS, payload: response });
    } catch (error) {
      alert("Error obtaining Pokemons.", error.message);
    }
  };
};

export const getPokemonDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = (await axios(`http://localhost:3001/pokemon/${id}`))
        .data;
      dispatch({ type: GET_DETAILS, payload: response });
    } catch (error) {
      alert("Error obtaining details.", error.message);
    }
  };
};

// export const getPokemonDetails = (id) => {
//   return (dispatch) => {
//     fetch(`http://localhost:3001/pokemon/${id}`)
//       .then((response) => response.json())
//       .then((data) => dispatch({ type: GET_DETAILS, payload: data }))
//       .catch((error) => {
//         return error
//       });
//   }
// };
      
// export const getPokemonDetails = (id) => {
//   return async (dispatch) => {
//     const response = (await axios(`http://localhost:3001/pokemon/${id}`)).data;
//     dispatch({ type: GET_DETAILS, payload: response });
//   };
// };

export const searchPokemon = (name) => {
  return async (dispatch) => {
    try {
      const response = (await axios(`http://localhost:3001/pokemon/?name=${name}`)).data;
      dispatch({ type: SEARCH_POKEMON, payload: response });
    } catch (error) {
      alert(`${name} was not found in Pokemons.`, error.message);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = (await axios(`http://localhost:3001/type`)).data
      dispatch({ type: GET_TYPES, payload: response });
    } catch (error) {
      alert("Error obtaining types", error.message);
    }
  };
};

export const filterByTypes = (type) => {
  return {type: FILTER_BY_TYPES, payload: type}
};

export const filterByOrigin = (origin) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin
  }
};

export const setOrder = (filter) => {
  return {
    type: SET_ORDER,
    payload: filter,
  };
};