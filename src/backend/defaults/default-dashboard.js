const PageBuilder = require('../utils/page-builder.js')

class DefaultDashboard extends PageBuilder {
  constructor(props) {
    super(props)
    this.title = 'Dashboard'
  }

  async build() {
    this.setDefaultDashboard()
  }
}

module.exports = DefaultDashboard
