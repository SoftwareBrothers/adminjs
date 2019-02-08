const pug = require('pug')

class Renderer {
  constructor() {
    const pathRoot = `${__dirname}/../..`
    this.views_path = `${pathRoot}/frontend/views/`
  }

  render(view, data) {
    const viewFunction = pug.compileFile(`${this.views_path}${view}.pug`)
    return viewFunction(data)
  }
}

module.exports = Renderer
