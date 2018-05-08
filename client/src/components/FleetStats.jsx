import React from 'react';

const FleetStats = (props) => {
  const enemyFleetStats = props.enemyFleet.map(ship => <li className="shipListItem">{`${ship[0]}: ${ship[1]} out of ${ship[2]} ship parts`}</li>)
  const playerFleetStats = props.playerFleet.map(ship => <li className="shipListItem">{`${ship[0]}: ${ship[1]} out of ${ship[2]} ship parts`}</li>)
  return (
  <div id={props.fleet}>
    <div className="shipStatsHeader">Ships Hit</div>
    <ul className="shipList">
      {props.fleet === 'enemyFleet' ? enemyFleetStats : playerFleetStats}
    </ul>
  </div>
)}

export default FleetStats;