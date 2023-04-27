import { getPokemonDetails } from "../../redux/actions";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import style from './Detail.module.css';
import Loading from "../Home/Loading/Loading";

const Detail = () => {
    const { id } = useParams();
    const pokemonDetails = useSelector((state) => state.details);
    const isLoading = useSelector((state) => state.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetails(id));
    }, [dispatch, id]);

    const pokemonDetailsArray = Array.isArray(pokemonDetails) ? pokemonDetails : [pokemonDetails];

    return (
        <div className={style.container}>
            {isLoading && <Loading />}
            {!isLoading && (
                <>
                    <div className={style.buttonDiv}>
                        <Link to="/home" className={style.button}>
                        BACK
                        </Link>
                    </div>
                    <div className={style.wrapper}>
                        <div className={style.nameDiv}>
                            <p className={style.name}>{pokemonDetailsArray[0]?.name}</p>
                        </div>
                        <div className={style.infoDiv}>
                        <div className={style.imageDiv}>
                            <img  src={pokemonDetailsArray[0]?.image} alt="Image not found" className={style.image}/>
                        </div>
                            <div className={style.details}>
                                <div className={style.grid}>
                                    <div className={style.detail}>
                                        <p className={style.label}>HP</p>
                                        <p className={style.value}>{pokemonDetailsArray[0]?.hp}</p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.label}>HEIGHT</p>
                                        <p className={style.value}>{pokemonDetailsArray[0]?.height}</p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.label}>WEIGHT</p>
                                        <p className={style.value}>{pokemonDetailsArray[0]?.weight}</p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.label}>ATTACK</p>
                                        <p className={style.value}>{pokemonDetailsArray[0]?.attack}</p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.label}>DEFENSE</p>
                                        <p className={style.value}>{pokemonDetailsArray[0]?.defense}</p>
                                    </div>
                                    <div className={style.detail}>
                                        <p className={style.label}>SPEED</p>
                                        <p className={style.value}>{pokemonDetailsArray[0]?.speed}</p>
                                    </div>
                                </div>
                                <div className={style.types}>
                                    <p className={style.label}>TYPES</p>
                                    <div className={style.typeList}>
                                        {pokemonDetailsArray[0]?.types.map((type) => {
                                            return <div className={style.type}>{typeof type === 'object' ? type.name : type}</div>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
};


export default Detail;