import { gamePieces } from '../gameConstants.js'

export const createBoard = (board) => {
  const newBoard = [];
  for (let m = 0; m < 10; m++) {
    let row = [];
    for (let n = 0; n < 10; n++) {
      let piece = board ? board[m][n] : {piece: 'E', pos: null, hit: false, show: false};
      row.push(piece);
    }
    newBoard.push(row);
  }
  return newBoard;
}

export const getNewBoard = (board, action) => {
  const newBoard = createBoard(board);
  const newPiece = {piece: action.piece, pos: action.pos, hit: false, show: false}
  console.log('newPiece', newPiece)
  if (action.pos === 'horizontal') {
    for (let n = 0; n < gamePieces[action.piece]; n++) {
      newBoard[action.row][n + action.col] = newPiece;
    }
  } else {
    for (let m = 0; m < gamePieces[action.piece]; m++) {
      newBoard[m + action.row][action.col] = newPiece;
    }
  }
  return newBoard;
}

export const createBoardWithRandomPieces = () => {
  const newBoard = createBoard();
  const ships = ['ACC', 'BS', 'C', 'S', 'D'];
  for (let i = 0; i < ships.length; i++) {
    let shipName = ships[i];
    let position = getRandomPosition();
    let { row, column } = getValidPosition(shipName, position, newBoard);
    let newPiece = {piece: shipName, pos: position, hit: false, show: false}
    for (let j = 0; j < gamePieces[shipName]; j++) {
      if (position === 'horizontal') {
        newBoard[row][column + j] = newPiece;
      } else {
        newBoard[row + j][column] = newPiece;
      }
    }
  }
  return newBoard;
}

export const getValidPosition = function(shipName, position, board) {
  let boardLength = 10;
  let row;
  let column
  let isSpaceOccupied = true;
  while (isSpaceOccupied) {
    if (position === 'horizontal') {
      let horizontalRange = boardLength - gamePieces[shipName];
      row = getRandomNumber(0, boardLength - 1);
      column = getRandomNumber(0, horizontalRange);
      isSpaceOccupied = checkIfRangeIsOccupied(row, column, gamePieces[shipName], position, board)
    } else {
      let verticalRange = boardLength - gamePieces[shipName];
      row = getRandomNumber(0, verticalRange);
      column = getRandomNumber(0, boardLength - 1);
      isSpaceOccupied = checkIfRangeIsOccupied(row, column, gamePieces[shipName], position, board)
    }
  }

  return { row, column };
}

export const checkIfRangeIsOccupied = function(row, column, spaces, position, board) {
  for (let i = 0; i < spaces; i++) {
    if (position === 'horizontal' && board[row][column + i].piece !== 'E') {
      return true;
    } else if (position === 'vertical' && board[row + i][column].piece !== 'E') {
      return true;
    }
  }
  return false;
}

export const destroyRandomSpotOnPlayerBoard = function(board) {
  let isSpaceOccupied = true;
  let row;
  let col;
  while(isSpaceOccupied) {
    row = getRandomNumber(0, 9);
    col = getRandomNumber(0,9);
    if (!board[row][col].hit) {
      isSpaceOccupied = false;
    }
  }
  return { row, col }
}

export const getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const getRandomPosition = function() {
  return Math.random() > .5 ? 'horizontal' : 'vertical'
}
