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

    return (
        <div>
            {pokemonDetails.length === 0 && <div>Loading...</div>}
            <Link to="/home" className='{styles.buttonBack}' >HOME</Link>
            <div>
                <img className="{style.image}" src={pokemonDetails[0]?.image} alt="Image not found" />
            </div>
            <div>
                <p className='{styles.name}'>{pokemonDetails[0]?.name}</p>
            </div>
            <div className="{style.details}">
                <p>{pokemonDetails[0]?.hp}</p>
                <p>{pokemonDetails[0]?.height}</p>
                <p>{pokemonDetails[0]?.weight}</p>
                <p>{pokemonDetails[0]?.attack}</p>
                <p>{pokemonDetails[0]?.defense}</p>
                <p>{pokemonDetails[0]?.speed}</p>
            </div>
            <div>
                <p className="{style.types}">{pokemonDetails[0]?.types.map(type => {return <div  className='{styles.type}'>{type}</div>})}</p>
            </div>
        </div>
    )
};

export default Detail;