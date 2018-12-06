const pug = require('pug')
const sass = require('node-sass')
const { promisify } = require('util')

class Renderer {
  constructor(view, data) {
    this.view = view
    this.data = data
    const pathRoot = `${__dirname}/../..`
    this.views_path = `${pathRoot}/frontend/views/`
  }

  async render() {
    const viewFunction = pug.compileFile(`${this.views_path}${this.view}.pug`)
    return viewFunction(this.data)
  }
}

module.exports = Renderer
