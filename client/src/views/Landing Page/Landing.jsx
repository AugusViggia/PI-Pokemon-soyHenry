import style from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {

    console.log('cualquier cosa');

    return (
        <div className='{style.container}'>
            <div className='{style.title}'>
                <h1>Estas En Landing Page</h1>
            </div>
            <div className='{style.linkList}'>
                <Link className='{style.button}' to='/home'>HOME</Link>
            </div>
        </div>
    )
};

export default Landing;