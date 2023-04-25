const { useState } = require("react")

const CreatePokemon = () => {
    const [input, setInput] = useState({
        name: '',
        image: '',
        hp: 0,
        height: 0,
        weight: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        types: []
    });

    const [error, setError] = useState({
        name: '',
        image: '',
        hp: '',
        height: '',
        weight: '',
        attack: '',
        defense: '',
        speed: '',
        types: ''
    });

    const validate = (input) => {
        if ((input.name.length < 5).test(input.name)) {
            setError({
                ...error,
            name:"Name must have at least 4 characters"})
            return;
        }
        setError({
            ...error,
            name:""
        })
    };

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
    
        validate({
            ...input,
            [event.target.name]:event.target.value
        })
    };
    
    return (
        <div>
            <form onSubmit={""}>
                <div>
                    <label name='name' value={input.value} onChange={handleChange}>Name: </label>
                    <input />
                    <span>{error.name}</span>
                </div>
                <div>
                    <label name='image' value={input.value} onChange={handleChange}>Image: </label>
                    <input/>
                </div>
                <div>
                    <label name='hp' value={input.value} onChange={handleChange}>Hp: </label>
                    <input/>
                </div>
                <div>
                    <label name='height' value={input.value} onChange={handleChange}>Height: </label>
                    <input/>
                </div>
                <div>
                    <label name='weight' value={input.value} onChange={handleChange}>Weight: </label>
                    <input/>
                </div>
                <div>
                    <label name='attack' value={input.value} onChange={handleChange}>Attack: </label>
                    <input/>
                </div>
                <div>
                    <label name='defense' value={input.value} onChange={handleChange}>Defense: </label>
                    <input/>
                </div>
                <div>
                    <label name='speed' value={input.value} onChange={handleChange}>Speed: </label>
                    <input/>
                </div>
                <div>
                    <label name='types' value={input.value} onChange={handleChange}>Types: </label>
                    <input/>
                </div>
                {error.name ? null : <button type="submit">CREATE POKEMON</button>}
            </form>
        </div>
    )
};

export default CreatePokemon;