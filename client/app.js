import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import View from './hours/view.jsx'

function mapStateToProps(state) {
  return {
    days: state.days,
    locations: state.locations
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
