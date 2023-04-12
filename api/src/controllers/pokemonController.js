const { Pokemon, Type } = require('../db')
const axios = require("axios");
const { Op } = require("sequelize");
require("dotenv").config();
const { API_URL } = process.env;

const pokemonFilterForApi = (arr) => arr.map((pokemon) => {
    return {
        id: pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight: pokemon.weight,
        hp: pokemon.stats[0].base_stat,
        image: pokemon.sprites.other.dream_world.front_default,
        attack: pokemon.stats[1].base_stat,
        defense: pokemon.stats[2].base_stat,
        speed: pokemon.stats[5].base_stat,
        types: pokemon.types.map((t) => t.type.name)
    };
})

const getAllPokemons = async () => {

    const dataBasePokemons = await Pokemon.findAll();

    const apiPokemonsRaw = (
        await axios(`${API_URL}?limit=20`)
    );

    const pokemonUrls = apiPokemonsRaw.data?.results.map(
        (pokemon) => pokemon.url
    );
    const pokemonUrlRequests = pokemonUrls.map((url) => axios.get(url)); // haces un array de axios urls.

    const pokemonUrlResponses = await Promise.all(pokemonUrlRequests); // esperas a que lleguen todas las respuestas

    const pokemonData = pokemonUrlResponses.map((response) => response.data); // guardas toda la info que trajo axios en todo el recorrido

    const apiPokemons = pokemonFilterForApi(pokemonData); // le filtras la info de la API

    return [...dataBasePokemons, ...apiPokemons];
};

module.exports = {
    getAllPokemons
}