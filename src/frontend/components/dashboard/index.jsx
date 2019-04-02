import React from 'react'
import { connect } from "react-redux"

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(Dashboard)
