import { getPokemonDetails } from "../../redux/actions";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import style from './Detail.module.css';
import Loading from "../Home/Loading/Loading";

const Detail = () => {
    const { id } = useParams();
    const pokemonDetails = useSelector((state) => state.details);
    const isLoading = useSelector((state) => state.isLoading);
    const [imageLoaded, setImageLoaded] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemonDetails(id));
    }, [dispatch, id]);

    const pokemonDetailsArray = Array.isArray(pokemonDetails) ? pokemonDetails : [pokemonDetails];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setImageLoaded(true);
            }, 1200);

        return () => {
            clearTimeout(timeoutId);
            };
    }, []);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const capitalizedName = pokemonDetailsArray[0]?.name ? pokemonDetailsArray[0]?.name.charAt(0).toUpperCase() + pokemonDetailsArray[0]?.name.slice(1) : '';

    return (
        <div className={style.container}>
            {(!imageLoaded || isLoading) && <Loading />}
            {!isLoading && imageLoaded &&(
                <>
                    <div className={style.buttonDiv}>
                        <Link to="/home" className={style.button}>
                        BACK
                        </Link>
                    </div>
                    <div className={style.wrapper}>
                        <div className={style.nameDiv}>
                            <p className={style.name}>{capitalizedName}</p>
                        </div>
                        <div className={style.infoDiv}>
                        <div className={style.imageDiv}>
                                <img src={pokemonDetailsArray[0]?.image} alt="" className={style.image}
                                onLoad={handleImageLoad}/>
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