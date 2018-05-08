
export const START_GAME = 'START_GAME';
export const ADD_SHIP = 'ADD_SHIP';
export const DESTROY_SPOT = 'DESTROY_SPOT';
export const CHOOSE_SHIP = 'CHOOSE_SHIP';
export const ADD_SCORE = 'ADD_SCORE';
export const SELECT_SHIP = 'SELECT_SHIP';
export const SELECT_POSITION = 'SELECT_POSITION';

export const onCellClick = (row, col, boardType) => {
  return (dispatch, getState) => {
    const state = getState();
    const gamePhase = state.gamePhase;
    const selectedShip = state.gameLogic.selectedPiece;
    const selectedPosition = state.gameLogic.selectedPosition;

    if (gamePhase === 'pregamePhase' && boardType === 'playerBoard') {
      console.log('pregamePhase');
      dispatch(addShip(selectedShip, selectedPosition, row, col));
    } else if (gamePhase === 'battlePhase' && boardType === 'enemyBoard'){
      dispatch(destroyEnemySpot(row, col))
    } else if (gamePhase === 'pregamePhase' && boardType === 'enemyBoard') {
      alert('Not ready to destroy!')
    } else {
      alert('Dont destroy your own ships!')
    }

  }
}
export const addShip = (selectedShip, selectedPosition, row, col) => {
  return {
    type: ADD_SHIP,
    piece: selectedShip,
    pos: selectedPosition,
    row,
    col
  }
}

export const selectShip = (piece, position="vertical") => {
  return {
    type: SELECT_SHIP,
    piece,
    position
  }
}

export const selectPosition = (position) => {
  return {
    type: SELECT_POSITION,
    position
  }
}

export const destroyEnemySpot = (row, col) => {
  return {
    type: DESTROY_SPOT,
    row,
    col
  }
}
