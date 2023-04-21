import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_DETAILS = 'GET_DETAILS';

export const getPokemons = () => {
  return async function (dispatch) {
    try {
      const response = (await axios(`http://localhost:3001/pokemon`)).data;

      dispatch({ type: GET_POKEMONS, payload: response});
    } catch (error) {
      alert("Error obtaining Pokemons", error.message);
    }
  }
};

export const getPokemonDetails = (id) => {
  return async (dispatch) => {
    try {
      const response = (await axios(`http://localhost:3001/pokemon/${id}`)).data;
      dispatch({ type: GET_DETAILS, payload: response });
    } catch (error) {
        alert("Error obtaining Details", error.message);
      }
    }
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
//     dispatch({ type: GET_DETAILS, payload: response })
//   };
// };