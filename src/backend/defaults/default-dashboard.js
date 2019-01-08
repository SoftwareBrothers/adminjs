const PageBuilder = require('../utils/page-builder.js')

class DefaultDashboard extends PageBuilder {
  async build() {
    this.addWelcomeBlock()
  }
}

module.exports = DefaultDashboard
