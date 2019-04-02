import React from 'react'
import { connect } from "react-redux"

class RecordAction extends React.Component {
  render() {
    return (
      <div>
        RecordAction
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  paths: state.paths,
})

export default connect(mapStateToProps)(RecordAction)
