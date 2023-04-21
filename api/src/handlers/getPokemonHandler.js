const { getAllPokemons, getPokemonById, getPokemonByName, createPokemon } = require('../controllers/pokemonController');

const OK = 200;
const err = 400;

const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;

    const results = name ? await getPokemonByName(name) : await getAllPokemons();

    res.status(OK).json(results);
};

const getPokemonByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'bdd' : 'api';

    try {
        const pokemon = await getPokemonById(id, source);
        res.status(OK).send(pokemon);
    } catch (error) {
        res.status(err).json({ error: error.message });
    }
};

const getPokemonByNameHandler = async (req, res) => {
    const { name } = req.query;

    try {
        const pokemon = await getPokemonByName(name);
        if (pokemon) res.status(OK).json(pokemon);
        res.status(err).send('Pokemon not found, check your spelling');
    } catch (error) {
        res.status(err).json({ error: error.message });
    }
};

const postPokemonHandler = async (req, res) => {
    const { name, height, weight, hp, image, attack, defense, speed, types } =
        req.body;

    try {
        const newPokemon = await createPokemon(
        name,
        height,
        weight,
        hp,
        image,
        attack,
        defense,
        speed,
        types
        );
        res.status(200).json({ newPokemon });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    getPokemonsHandler,
    getPokemonByIdHandler,
    getPokemonByNameHandler,
    postPokemonHandler
}