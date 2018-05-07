
export const START_GAME = 'START_GAME';
export const ADD_SHIP = 'ADD_SHIP';
export const DESTROY_SPOT = 'DESTROY_SPOT';
export const CHOOSE_SHIP = 'CHOOSE_SHIP';
export const ADD_SCORE = 'ADD_SCORE';
export const SELECT_SHIP = 'SELECT_SHIP';

export const addShip = (selectedShip, selectedPosition, row, col) => {
  return {
    type: ADD_SHIP,
    piece: selectedShip,
    pos: selectedPosition,
    row,
    col
  }
}

export const selectShip = (piece) => {
  return {
    type: SELECT_SHIP,
    piece,
  }
}

export const destroyEnemySpot = (row, col) => {
  return {
    type: DESTROY_SPOT,
    board: enemyBoard,
    row,
    col
  }
}



// export const addScore = () => {
//   return {
//     type: 
//   }
// }

//exampleState

// {
//   gameState: 'Battle' || 'BeginGame',
//   playerBoard: [[{piece: 'ACC1', pos: 'horizontal', hit: false}, {piece: 'ACC2', hit: false}]]
// }