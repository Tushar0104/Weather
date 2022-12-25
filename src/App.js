import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
