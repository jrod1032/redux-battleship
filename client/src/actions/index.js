
export const START_GAME = 'START_GAME';
export const ADD_SHIP = 'ADD_SHIP';
export const DESTROY_SPOT = 'DESTROY_SPOT';
export const CHOOSE_SHIP = 'CHOOSE_SHIP';
export const ADD_SCORE = 'ADD_SCORE';

export const addShip = (currentShip) => {
  return {
    type: ADD_SHIP,
    piece: currentShip.piece,
    pos: currentShip.pos,
    index: currentShip.index,
    row: currentShip.row,
    col: currentShip.col
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