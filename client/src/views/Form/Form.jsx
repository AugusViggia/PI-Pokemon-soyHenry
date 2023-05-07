import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";
import { useState, useEffect } from "react";  
import axios from "axios";
import { Link } from "react-router-dom";
import style from './Form.module.css';
import { useHistory } from 'react-router-dom';
import Loading from "../Home/Loading/Loading";

const CreatePokemon = () => {
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    const types = useSelector((state) => state.types);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(getTypes());
        setLoading(false)
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
    
    const allFieldsValid = () => {
        return (
            input.name.trim().length >= 4 &&
            input.hp >= 1 && input.hp <= 999 &&
            input.attack >= 1 && input.attack <= 999 &&
            input.defense >= 1 && input.defense <= 999 &&
            input.speed >= 1 && input.speed <= 999 &&
            input.height >= 1 && input.height <= 999 &&
            input.weight >= 1 && input.weight <= 999 &&
            input.image.trim() !== "" &&
            input.types.length > 0 &&
            error.name === "" &&
            Object.values(error).every(val => val === "")
        );
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value
        }));
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

        if (allFieldsValid()) {
            try {
                const response = await axios.get(`http://localhost:3001/pokemon?name=${input.name}`);
                if (response.data.length > 0) {
                    alert(`Pokemon ${input.name} already exists.`);
                    return;
                };
            } catch (error) {
                alert(`Verification error: ${error.message}`);
                return;
            };

            try {
                await axios.post("http://localhost:3001/pokemon/post", input);
                alert("Pokemon was creaated.");
                history.push('/home');
            } catch (error) {
                console.error(error);
                alert(`Creation error: ${error.message}`);
            };
        } else {
            alert("Select at least one type.");
        }
    };

    return (
        <div className={style.container}>
            <div className={style.buttonDiv}>
                <Link to="/home" className={style.buttonBack}>BACK</Link>
            </div>
            {loading || types.length < 20? (
                <Loading/>
            ) : 
                (
                    <form method="POST" onSubmit={handleSubmit} className={style.form}>
                    <p className={style.title}>PoKéMoN! CREATOR</p>
                    <div className={style.formGroup}>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={input.name}
                            onChange={handleChange}
                            className={error.name ? 'form-control is-invalid' : 'form-control'}
                            placeholder="write a name..."/>
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
                            placeholder="it has to be .png/.jpg"/>
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
                    <div className="{style.formGroup}">
                        <label htmlFor="types" className={style.checkBoxTitle}>Types:</label>
                        <div className={style.checkBoxDiv}>
                            {types?.map((type) => {
                                return (
                                    <div key={type.id} >
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
                        </div>
                        <div className={style.invalidFeedback}>{error.types}</div>
                    </div>
                    {allFieldsValid() && (
                        <button type="submit" onClick={handleSubmit}>
                            CREATE POKEMON
                        </button>
                    )}
                    </form>
                )}
        </div>
    );
};

export default CreatePokemon;