import { connect } from 'react-redux';
import FleetStats from '../components/FleetStats.jsx'

const mapStateToProps = state => {
  return {
    enemyFleet: state.gameLogic.enemyFleet,
    playerFleet: state.gameLogic.playerFleet
  }
}

export default connect(
  mapStateToProps
  )(FleetStats)