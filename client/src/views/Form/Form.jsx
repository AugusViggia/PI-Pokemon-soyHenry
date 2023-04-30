import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import { useState, useEffect } from "react";  
import axios from "axios";
import { Link } from "react-router-dom";
import style from './Form.module.css';


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
        if (input.name !== "") {
            errors.name = 'Name must have at least 4 characters';
        }
        if (!input.image) {
            errors.image = 'Image is required';
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
        if (input.types !== []) {
            errors.types = 'Select at least one Pokemon type';
        } else {
            errors.types = '';
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
        <div className={style.container}>
            <div className={style.buttonDiv}>
                <Link to="/home" className={style.buttonBack}>BACK</Link>
            </div>
            <form onSubmit={handleSubmit} className={style.form}>
                <h3 className={style.title}>POKEMON CREATOR</h3>
                <div className={style.formGroup}>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={input.name}
                        onChange={handleChange}
                        className={error.name ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className={style.invalidFeedback}>{error.name}</span>
                </div>
                <div className={style.formGroup}>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="text"
                        id="image"
                        name="image"
                        value={input.image}
                        onChange={handleChange}
                        className={error.image ? 'form-control is-invalid' : 'form-control'}
                        />
                    <span className={style.invalidFeedback}>{error.image}</span>
                </div>
                <div className={style.formGroup}>
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
                    <span className={style.invalidFeedback}>{error.hp}</span>
                </div>
                <div className={style.formGroup}>
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
                    <span className={style.invalidFeedback}>{error.height}</span>
                </div>
                <div className={style.formGroup}>
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
                    <span className={style.invalidFeedback}>{error.weight}</span>
                </div>
                <div className={style.formGroup}>
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
                    <span className={style.invalidFeedback}>{error.attack}</span>
                </div>
                <div className={style.formGroup}>
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
                    <span className={style.invalidFeedback}>{error.defense}</span>
                </div>
                <div className={style.formGroup}>
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
                    <span className={style.invalidFeedback}>{error.speed}</span>
                </div>
                <div className={style.formGroup}>
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
                    <div className={style.invalidFeedback}>{error.types}</div>
                </div>
                    <button type="submit" onClick={handleSubmit}>
                        CREATE POKEMON
                    </button>
            </form>
        </div>
    );
};

export default CreatePokemon;

// {allFieldsValid() && (
//             )}
// const allFieldsValid = () => {
// return (
//     input.name !== "" &&
//     input.hp !== 0 &&
//     input.attack !== 0 &&
//     input.defense !== 0 &&
//     input.speed !== 0 &&
//     input.height !== 0 &&
//     input.weight !== 0 &&
//     input.image !== "" &&
//     input.types !== [] && 
//     error.name === "" &&
//     error.hp === 0 &&
//     error.attack === 0 &&
//     error.defense === 0 &&
//     error.speed === 0 &&
//     error.height === 0 &&
//     error.weight === 0 && 
//     error.image === "" &&
//     (!error.types || error.types === [])
// )
// };

