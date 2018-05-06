import { combineReducers } from 'redux';

function gameStatus(state = 'pregame', action) {
    console.log('start game');
    return null
}

const BattleshipApp = combineReducers({
  gameStatus
});


export default BattleshipApp;