import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import BattleshipGame from './components/BattleshipGame.jsx';
import BattleshipApp from './reducers/index.js'

const store = createStore(BattleshipApp);

const App = () => (
  <Provider store={store}>
    <div>
      <BattleshipGame />
    </div>
  </Provider>  
);

ReactDOM.render(<App />, document.getElementById('app'))