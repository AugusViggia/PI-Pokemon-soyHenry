const { getAllPokemons } = require('../controllers/pokemonController');

const getPokemonsHandler = async (req, res) => {
    const { name } = req.query;

    const results = name ? await getPokemonByName(name) : await getAllPokemons();

    res.status(200).json(results);
};

module.exports = {
    getPokemonsHandler
}