import { GET_DETAILS, GET_POKEMONS } from "./actions";

const initialState = {
    pokemons: [],
    types: [],
    details: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            };
        
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }

        default:
        return { ...state };
    }
};

export default reducer;