import './App.css';
import  Home  from './views/Home/Home';
import { Route } from 'react-router-dom';
import Landing from './views/Landing Page/Landing';
import Detail from './views/Detail/Detail';
import CreatePokemon from './views/Form/Form';

function App() {
  return (
    <div className="App">
      <Route exact path="/"
        render={() => <Landing/>} />
      <Route exact path="/home"
        render={() => <Home/>} />
      <Route exact path="/detail/:id"
        render={() => <Detail/>} />
      <Route exact path="/form"
        render={() => <CreatePokemon/>} />
    </div>
  );
}

export default App;
