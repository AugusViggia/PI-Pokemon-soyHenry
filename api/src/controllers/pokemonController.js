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
        types: pokemon.types.map((t) => t.type.name),
        created: false,
    };
});

const createPokemon = async (
        name,
        height,
        weight,
        hp,
        image,
        attack,
        defense,
        speed,
        TypeIds
    ) => {
    const newPokemon = await Pokemon.create({
        name,
        height,
        weight,
        hp,
        image,
        attack,
        defense,
        speed,
    });
    await newPokemon.setTypes(TypeIds);
    const types = await newPokemon.getTypes();

    return {
        ...newPokemon.toJSON(),
        types: types.map((type) => type.name),
    };
};

const getAllPokemons = async () => {

    const dataBasePokemons = await Pokemon.findAll();

    const apiPokemonsRaw = (
        await axios(`${API_URL}/pokemon?limit=20`)
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

const getPokemonById = async (id, source) => {
    const pokemon =
        source === 'api'
            ? (
                await axios(`${API_URL}/pokemon/${id}`)
            ).data
            : await Pokemon.findByPk(id, {
                include: {
                    model: Type,
                },
            });
    
    console.log(pokemon);
    return pokemonFilterForApi([pokemon]);
};

const getPokemonByName = async (name) => {
    let nameToLowerCase = name.toLowerCase();
    const dataBasePokemons = await Pokemon.findAll({
        where: {
        name: { [Op.iLike]: `%${nameToLowerCase}%` },
        },
    });

    const apiPokemonsRaw = (await axios(`${API_URL}/pokemon?search=${nameToLowerCase}`));

    const pokemonUrls = apiPokemonsRaw.data?.results.map(
        (pokemon) => pokemon.url
    );
    const pokemonUrlRequests = pokemonUrls.map((url) => axios.get(url)); // haces un array de axios urls.

    const pokemonUrlResponses = await Promise.all(pokemonUrlRequests); // esperas a que lleguen todas las respuestas

    const pokemonData = pokemonUrlResponses.map((response) => response.data); // guardas toda la info que trajo axios en todo el recorrido

    const apiPokemons = pokemonFilterForApi(pokemonData);

    const filteredInApi = apiPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(nameToLowerCase));

    return [...dataBasePokemons, ...filteredInApi];
};

module.exports = {
    getAllPokemons,
    getPokemonById,
    getPokemonByName,
    createPokemon
}