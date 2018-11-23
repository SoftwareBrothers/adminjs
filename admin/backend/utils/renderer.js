const pug = require('pug')
const sass = require('node-sass')
const { promisify } = require('util')

class Renderer {
  constructor(view, data) {
    this.view = view
    this.data = data

    this.styles_path = 'admin/frontend/styles/index.css.sass'
    this.views_path = 'admin/frontend/views/'
  }

  async styles() {
    const style = await promisify(sass.render)({
      file: this.styles_path,
    })
    return style.css.toString('utf-8')
  }

  async render() {
    const data = {
      adminStyles: await this.styles(),
      ...this.data,
    }
    const viewFunction = pug.compileFile(`${this.views_path}${this.view}.pug`)
    return viewFunction(data)
  }
}

module.exports = Renderer
