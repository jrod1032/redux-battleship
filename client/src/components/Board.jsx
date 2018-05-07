import React from 'react';
;
const rows = ['A','B','C','D','E','F','G','H','I','J']
const columns = [1,2,3,4,5,6,7,8,9,10];

const Board = (props) => {
  console.log('props', props)
  return (
  <div className={props.className}>
    <table>
      <tr className="boardOuter">
        <th></th>
        <th>1</th>
        <th>2</th>
        <th>3</th>
        <th>4</th>
        <th>5</th>
        <th>6</th>
        <th>7</th>
        <th>8</th>
        <th>9</th>
        <th>10</th>
      </tr> 
      {props.board.map( (row, rowIdx) => {
        return <tr> <th className="boardOuter">{rows[rowIdx]}</th>
        {columns.map((col, colIdx) => {
          return <td
          className="boardCell"
          onClick={ () => props.addShip(props.selectedPiece, props.selectedPos, rowIdx, colIdx)}>
          {props.board[rowIdx][colIdx].piece}
          </td>
        })}</tr>
      })}   
    </table>
  </div>
  )
}

export default Board;