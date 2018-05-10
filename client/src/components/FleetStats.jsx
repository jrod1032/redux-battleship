import React from 'react';

const shipNameMap = {
  ACC: 'AirCraft Carrier',
  BS: 'Battleship',
  C: 'Cruiser', 
  D: 'Destroyer',
  S: 'Sub'
}

const FleetStats = (props) => {
  const enemyFleetStats = props.enemyFleet.map(ship => <li className="shipListItem">{shipNameMap[ship[0]]}</li>)
  const playerFleetStats = props.playerFleet.map(ship => <li className="shipListItem">{shipNameMap[ship[0]]}</li>)
  return (
  <div id={props.fleet}>
    <div className="shipStatsHeader">Ships Remaining</div>
    <ul className="shipList">
      {props.fleet === 'enemyFleet' ? enemyFleetStats : playerFleetStats}
    </ul>
  </div>
)}

export default FleetStats;