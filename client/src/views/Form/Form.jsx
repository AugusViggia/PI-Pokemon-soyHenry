import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import { useState, useEffect } from "react";  
import axios from "axios";
import { Link } from "react-router-dom";


const CreatePokemon = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);

    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTypes());
    }, []);

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
        const errors = {};
        if (input.name.length < 4) {
            errors.name = 'Name must have at least 4 characters';
        }
        if (!input.image) {
            errors.image = 'Image is required';
        }
        if (!input.types || input.types.length === 0) {
            errors.types = 'Select at least one Pokemon type';
        } else if (input.types.length > 2) {
            errors.types = 'No more than two types are allowed';
        }
        if (input.hp < 0 || input.hp > 200) {
            errors.hp = 'HP must be between 1 and 200';
        }
        if (input.height < 0 || input.height > 50) {
            errors.height = 'Height must be between 1 and 50';
        }
        if (input.weight < 0 || input.weight > 1000) {
            errors.weight = 'Weight must be between 1 and 1000';
        }
        if (input.attack < 0 || input.attack > 200) {
            errors.attack = 'Attack must be between 1 and 200';
        }
        if (input.defense < 0 || input.defense > 200) {
            errors.defense = 'Defense must be between 1 and 200';
        }
        if (input.speed < 0 || input.speed > 200) {
            errors.speed = 'Speed must be between 1 and 200';
        }
        setError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        });
        validate({
            ...input,
            [event.target.name]: event.target.value
        })
    };

    const handleCheck = (event) => {
    const selectedType = parseInt(event.target.value);
    const checked = event.target.checked;

    if (checked && selectedTypes.length < 2) {
        setSelectedTypes(prevSelectedTypes => [...prevSelectedTypes, selectedType]);
    } else {
        setSelectedTypes(prevSelectedTypes => prevSelectedTypes.filter(type => type !== selectedType));
    }

    setInput({
        ...input,
        types: checked ? [...selectedTypes, selectedType] : selectedTypes.filter(type => type !== selectedType)
    });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (input.types.length) {
            axios.post("http://localhost:3001/pokemon/post", input)
            .then(alert("Pokemon creado correctamente"))
            .catch(err => alert(err));
        } else {
            alert("Seleccione al menos un tipo de pokemon antes de continuar")
        }
    };

    
    return (
        <div className="container">
            <Link to="/home" className='{styles.buttonBack}'>HOME</Link>
            <form onSubmit={handleSubmit}>
                <h3>FORM</h3>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        className={error.name ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.name}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={input.image}
                        onChange={handleChange}
                        className={error.image ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.image}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="hp">Hp:</label>
                    <input
                        type="number"
                        id="hp"
                        name="hp"
                        min="0"
                        max="999"
                        value={input.hp}
                        onChange={handleChange}
                        className={error.hp ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.hp}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="height">Height:</label>
                    <input
                        type="number"
                        id="height"
                        name="height"
                        min="0"
                        max="999"
                        value={input.height}
                        onChange={handleChange}
                        className={error.height ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.height}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="weight">Weight:</label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        min="0"
                        max="999"
                        value={input.weight}
                        onChange={handleChange}
                        className={error.weight ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.weight}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="attack">Attack:</label>
                    <input
                        type="number"
                        id="attack"
                        name="attack"
                        min="0"
                        max="999"
                        value={input.attack}
                        onChange={handleChange}
                        className={error.attack ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.attack}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="defense">Defense:</label>
                    <input
                        type="number"
                        id="defense"
                        name="defense"
                        min="0"
                        max="999"
                        value={input.defense}
                        onChange={handleChange}
                        className={error.defense ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.defense}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="speed">Speed:</label>
                    <input
                        type="number"
                        id="speed"
                        name="speed"
                        min="0"
                        max="999"
                        value={input.speed}
                        onChange={handleChange}
                        className={error.speed ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className="invalid-feedback">{error.speed}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="types">Types:</label>
                    {types?.map((type) => {
                        return (
                            <div key={type.id}>
                                <label>
                                    {type.name}
                                </label>
                                <input
                                    type="checkbox"
                                    name="types"
                                    value={type.id}
                                    onChange={handleCheck}
                                    checked={selectedTypes.includes(type.id)}
                                    />
                            </div>
                        );
                    })}
                    <div className="invalid-feedback">{error.types}</div>
                </div>
                    <button type="submit" onClick={handleSubmit}>
                        CREATE POKEMON
                    </button>
            </form>
        </div>
    );
};

export default CreatePokemon;

//{allFieldsValid() && ()}
// const allFieldsValid = () => {
//     return (
//         input.name !== "" &&
//         input.hp !== 0 &&
//         input.attack !== 0 &&
//         input.defense !== 0 &&
//         input.speed !== 0 &&
//         input.height !== 0 &&
//         input.weight !== 0 &&
//         input.image !== "" &&
//         // input.types !== [] &&
//         error.name === "" &&
//         error.hp === "" &&
//         error.attack === "" &&
//         error.defense === "" &&
//         error.speed === "" &&
//         error.height === "" &&
//         error.weight === "" && 
//         error.image === "" 
//         // error.types === ""
//     )
// };

// const CreatePokemon = () => {
    //     const [input, setInput] = useState({
        //         name: '',
//         image: '',
//         hp: 0,
//         height: 0,
//         weight: 0,
//         attack: 0,
//         defense: 0,
//         speed: 0,
//         types: []
//     });

//     const [error, setError] = useState({
//         name: '',
//         image: '',
//         hp: '',
//         height: '',
//         weight: '',
//         attack: '',
//         defense: '',
//         speed: '',
//         types: ''
//     });

//     const validate = (input) => {
//         if ((input.name.length < 5).test(input.name)) {
//             setError({
//                 ...error,
//             name:"Name must have at least 4 characters"})
//             return;
//         }
//         setError({
//             ...error,
//             name:""
//         })
//     };

//     const handleChange = (event) => {
//         setInput({
//             ...input,
//             [event.target.name]: event.target.value
//         });
    
//         validate({
//             ...input,
//             [event.target.name]:event.target.value
//         })
//     };
    
//     return (
//         <div>
//             <form onSubmit={""}>
//                 <div>
//                     <label name='name' value={input.value} onChange={handleChange}>Name: </label>
//                     <input />
//                     <span>{error.name}</span>
//                 </div>
//                 <div>
//                     <label name='image' value={input.value} onChange={handleChange}>Image: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='hp' value={input.value} onChange={handleChange}>Hp: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='height' value={input.value} onChange={handleChange}>Height: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='weight' value={input.value} onChange={handleChange}>Weight: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='attack' value={input.value} onChange={handleChange}>Attack: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='defense' value={input.value} onChange={handleChange}>Defense: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='speed' value={input.value} onChange={handleChange}>Speed: </label>
//                     <input/>
//                 </div>
//                 <div>
//                     <label name='types' value={input.value} onChange={handleChange}>Types: </label>
//                     <input/>
//                 </div>
//                 {error.name ? null : <button type="submit">CREATE POKEMON</button>}
//             </form>
//         </div>
//     )
// };