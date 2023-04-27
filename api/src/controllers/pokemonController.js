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

const pokemonFilterDb = (arr) => arr.map((pokemon) => {
  return {
    id: pokemon.id,
    name: pokemon.name,
    height: pokemon.height,
    weight: pokemon.weight,
    hp: pokemon.hp,
    image: pokemon.image,
    attack: pokemon.attack,
    defense: pokemon.defense,
    speed: pokemon.speed,
    types: pokemon.types.map(type => type.name)
  };
})

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
  await newPokemon.addTypes(TypeIds);

  const createdPokemon = await Pokemon.findByPk(newPokemon.id, {
    include: {
      model: Type,
      as: "types",
    },
  });
  return createdPokemon;
};

const getAllPokemons = async () => {

    const dataBasePokemons = await Pokemon.findAll({
      include: {
        model: Type,
        as: "types",
        attributes: ["name"],
      },
    });

    const apiPokemonsRaw = (
        await axios(`${API_URL}/pokemon?limit=80`)
    );

    const pokemonUrls = apiPokemonsRaw.data?.results.map(
        (pokemon) => pokemon.url
    );
    const pokemonUrlRequests = pokemonUrls.map((url) => axios.get(url)); // haces un array de axios urls.

    const pokemonUrlResponses = await Promise.all(pokemonUrlRequests); // esperas a que lleguen todas las respuestas

    const pokemonData = pokemonUrlResponses.map((response) => response.data); // guardas toda la info que trajo axios en todo el recorrido

    const apiPokemons = pokemonFilterForApi(pokemonData); // le filtras la info de la API

    const dataBaseFiltered = pokemonFilterDb(dataBasePokemons);

    return [...dataBaseFiltered, ...apiPokemons];
};

const getPokemonById = async (id, source) => {
    const pokemon =
      source === "api"
        ? (await axios(`${API_URL}/pokemon/${id}`)).data
        : await Pokemon.findByPk(id, {
            include: {
              model: Type,
              as: "types",
            },
          });

  return source === "api" ? pokemonFilterForApi([pokemon]) : pokemon;
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