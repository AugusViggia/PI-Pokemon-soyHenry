import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_DETAILS = "GET_DETAILS";
export const SET_POKEMON_DETAIL = "SET_POKEMON_DETAIL";
export const SEARCH_POKEMON = 'SEARCH_POKEMON';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_TYPES = 'FILTER_BY_TYPES';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const SET_ORDER_BY_NAME = "SET_ORDER_BY_NAME";
export const SET_ATTACK = "SET_ATTACK";
export const SET_LOADING = "SET_LOADING";
export const RESET_FILTER_BY_TYPE = "RESET_FILTER_BY_TYPE";
export const RESET_FILTER_BY_ORIGIN = "RESET_FILTER_BY_ORIGIN";
export const RESET_ORDER_BY_NAME = "RESET_ORDER_BY_NAME";
export const RESET_ORDER_BY_ATTACK = "RESET_ORDER_BY_ATTACK";
export const RESET_ORDER = "RESET_ORDER";

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const response = (
        await axios(
          `https://soyhenry-pi-pokemon-production-b50b.up.railway.app/pokemon`
        )
      ).data;

      dispatch({ type: GET_POKEMONS, payload: response });
    } catch (error) {
      alert("Error obtaining Pokemons.", error.message);
    }
  };
};

export const getPokemonDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = (
        await axios(
          `https://soyhenry-pi-pokemon-production-b50b.up.railway.app/pokemon/${id}`
        )
      ).data;
      dispatch({ type: GET_DETAILS, payload: response });
    } catch (error) {
      alert("Error obtaining details.", error.message);
    }
  };
};

export const searchPokemon = (name) => {
  return async (dispatch) => {
    try {
      const response = (
        await axios(
          `https://soyhenry-pi-pokemon-production-b50b.up.railway.app/pokemon/?name=${name}`
        )
      ).data;
      dispatch({ type: SEARCH_POKEMON, payload: response });
    } catch (error) {
      alert(`${name} was not found in Pokemons.`, error.message);
    }
  };
};

export const getTypes = () => {
  return async (dispatch) => {
    try {
      const response = (
        await axios(
          `https://soyhenry-pi-pokemon-production-b50b.up.railway.app/type`
        )
      ).data;
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
  return function (dispatch) {
    dispatch({
      type: FILTER_BY_ORIGIN,
      payload: origin
    })
  }
};

export const setOrder = (setOrder) => {
  return function (dispatch) {
    dispatch({ type: SET_ORDER_BY_NAME, payload: setOrder });
  };
};

export const setAttack = (setOrder) => {
  return function (dispatch) {
    dispatch({
      type: SET_ATTACK, payload: setOrder
    })
  }
};

export const setLoading = (value) => ({
  type: SET_LOADING,
  payload: value,
});

export const resetFilterByType = (type) => {
  return {
    type: RESET_FILTER_BY_TYPE,
    payload: type,
  };
};

export const resetFilterByOrigin = (origin) => {
  return {
    type: RESET_FILTER_BY_ORIGIN,
    payload: origin,
  };
};

export const resetFilterByName = (name) => {
  return {
    type: RESET_ORDER_BY_NAME,
    payload: name,
  };
};

export const resetFilterByAttack = (attack) => {
  return {
    type: RESET_ORDER_BY_ATTACK,
    payload: attack,
  };
};

export const resetOrder = (order) => {
  return {
    type: RESET_ORDER,
    payload: order,
  };
};