const PageBuilder = require('../utils/page-builder.js')
const Renderer = require('../../backend/utils/renderer')

class DefaultDashboard  extends PageBuilder{
  constructor(props) {
    super(props)
    this.title = 'Dashboard'
  }

  async build() {
    this.addDefaultDashboard()
  }    
}

module.exports = DefaultDashboard