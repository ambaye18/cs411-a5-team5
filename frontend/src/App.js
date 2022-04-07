import logo from './logo.svg';
import './App.css';

// React front-end source: https://towardsdatascience.com/build-deploy-a-react-flask-app-47a89a5d17d9
function App() {
  // TODO: GET request to flask backend

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
