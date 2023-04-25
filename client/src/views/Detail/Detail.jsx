import { getPokemonDetails } from "../../redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import style from './Detail.module.css';

const Detail = () => {
    const { id } = useParams();
    const pokemonDetails = useSelector((state) => state.details);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetails(id));
    }, [dispatch, id]);

        const pokemonDetailsArray = Array.isArray(pokemonDetails) ? pokemonDetails : [pokemonDetails];

    return (
        <div>
            {pokemonDetails.length === 0 && <div>Loading...</div>}
            <Link to="/home" className='{styles.buttonBack}'>HOME</Link>
                <div>
                    <img className='{styles.image}' src={pokemonDetailsArray[0]?.image} alt="Image not found" />
                    <div>
                        <p className='{styles.name}'>{pokemonDetailsArray[0]?.name}</p>
                    </div>
                    <div className='{styles.details}'>
                        <p>{pokemonDetailsArray[0]?.hp}</p>
                        <p>{pokemonDetailsArray[0]?.height}</p>
                        <p>{pokemonDetailsArray[0]?.weight}</p>
                        <p>{pokemonDetailsArray[0]?.attack}</p>
                        <p>{pokemonDetailsArray[0]?.defense}</p>
                        <p>{pokemonDetailsArray[0]?.speed}</p>
                    </div>
                    <div>
                        {<p className='{styles.types}'>{pokemonDetailsArray[0]?.types.map((type) => { return (<div>{typeof type === 'object' ? type.name : type}</div>)})}</p>}
                    </div>
                </div>
        </div>
    )
};


export default Detail;