const { Router } = require('express');
const { getPokemonsHandler } = require('../handlers/getPokemonHandler');

const pokemonRouter = Router();

pokemonRouter.get('/', getPokemonsHandler);

module.exports = pokemonRouter;