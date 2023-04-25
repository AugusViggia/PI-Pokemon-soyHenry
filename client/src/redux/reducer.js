import {
  GET_POKEMONS,
  GET_DETAILS,
  GET_TYPES,
  SEARCH_POKEMON,
  FILTER_BY_TYPES,
  FILTER_BY_ORIGIN,
  SET_ORDER,
} from "./actions";

const initialState = {
  pokemons: [],
  details: [],
  types: [],
  filterByType: "all",
  filterByOrigin: "all",
  orderBy: "all",
  order: "all",
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

          case SET_ORDER:
            let filterByType = state.filterByType;
            let filterByOrigin = state.filterByOrigin;
            // Check if order is being reset to "all"
            if (action.payload.orderBy === "all") {
              filterByType = "all";
              filterByOrigin = "all";
            }
            return {
              ...state,
              orderBy: action.payload.orderBy,
              order: action.payload.order,
              filterByType,
              filterByOrigin,
            };

          case FILTER_BY_ORIGIN:
            if (action.payload !== "all") {
              if (action.payload === "data base") {
                return {
                  ...state,
                  filterByOrigin: state.pokemons.filter((pokemon) => {
                    return pokemon.id >= 1200;
                  }),
                };
              }
              if (action.payload === "api") {
                return {
                  ...state,
                  filterByOrigin: state.pokemons.filter((pokemon) => {
                    return pokemon.id < 1200;
                  }),
                };
              } else {
                return {
                  ...state,
                  filterByOrigin: null,
                };
              }
            }
            break;

          default:
            return { ...state };
        }
};

export default reducer;