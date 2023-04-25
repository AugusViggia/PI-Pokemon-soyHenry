const { Router } = require('express');
const {
  getPokemonsHandler,
  getPokemonByIdHandler,
  getPokemonByNameHandler,
  postPokemonHandler,
} = require("../handlers/getPokemonHandler");

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemonsHandler);
pokemonRouter.get('/:id', getPokemonByIdHandler);
pokemonRouter.get('/name?', getPokemonByNameHandler);
pokemonRouter.post('/post', postPokemonHandler);

module.exports = pokemonRouter;