import style from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {

    return (
        <div className={style.container}>
            <div className={style.title}>
                <h1>POKEMON APP</h1>
            </div>
            <div className={style.linkList}>
                <Link className={style.button} to='/home'>POKEDEX</Link>
            </div>
        </div>
    )
};

export default Landing;