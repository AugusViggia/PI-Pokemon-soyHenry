import {
  GET_POKEMONS,
  GET_DETAILS,
  GET_TYPES,
  SEARCH_POKEMON,
  FILTER_BY_TYPES,
  FILTER_BY_ORIGIN,
  SET_ORDER_BY_NAME,
  SET_ATTACK
} from "./actions";

const initialState = {
  pokemons: [],
  details: [],
  types: [],
  filterByType: "all",
  filterByOrigin: 'all',
  orderByName: "all",
  orderByAttack: "all",
  order:"asc"
};

const reducer = (state = initialState, action) => {
        switch (action.type) {
          case GET_POKEMONS:
            return {
              ...state,
              pokemons: action.payload,
            };

          case GET_DETAILS:
            return {
              ...state,
              details: action.payload,
            };

          case SEARCH_POKEMON:
            return {
              ...state,
              pokemons: action.payload,
            };

          case GET_TYPES:
            return {
              ...state,
              types: action.payload,
            };

          case FILTER_BY_TYPES:
            if (action.payload !== "all") {
              return {
                ...state,
                filterByType: action.payload,
              };
            } else {
              return {
                ...state,
                filterByType: action.payload,
              };
            }

          case SET_ORDER_BY_NAME:
            return {
              ...state,
              orderByName: action.payload.orderByName,
              order: action.payload.order,
            };
          
          case SET_ATTACK:
            return {
              ...state,
              orderByAttack: action.payload.orderByAttack,
              order: action.payload.order
            }

          case FILTER_BY_ORIGIN:
            return {
              ...state,
              filterByOrigin: action.payload,
            };

          default:
            return {
              ...state,
            };
        }
};

export default reducer;