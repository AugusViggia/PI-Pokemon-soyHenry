import './App.css';
import  Home  from './views/Home/Home';
import { Route } from 'react-router-dom';
import Landing from './views/Landing Page/Landing';
import Detail from './views/Detail/Detail';

function App() {
  return (
    <div className="App">
      <h1>Henry Pokemon</h1>
      <Route exact path="/"
        render={() => <Landing />} />
      <Route exact path="/home"
        render={() => <Home />} />
      <Route exact path="/detail/:id"
        render={() => <Detail/> } />
    </div>
  );
}

export default App;
