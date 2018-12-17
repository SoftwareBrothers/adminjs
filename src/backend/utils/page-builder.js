/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/* eslint-disable class-methods-use-this */

const NotImplementedError = require('../utils/not-implemented-error')
const Renderer = require('../../backend/utils/renderer')

/**
 * PageBuilder class contains methods which allows you to create HTML content as JavaScript string
 */
class PageBuilder {
  /**
   *
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   */
  constructor({ admin }) {
    this._admin = admin

    /**
     * List of HTML elements as JavaScript string
     * @type {String[] | Function | null}
     */
    this._pageContent = []
    this._pageHeader = null
    this.title = null
    this.charts = {}
    this.colorTypes = {
      warning: '#ff9f89',
      danger: '#f0616f',
      succes: '#21c197',
      info: '#718af4',
    }
  }

  /**
   * Returns string of HTML elements
   * Can be overwritten in custom pages
   * @return {String}
   */
  async render() {
    await this.build()
    return {
      title: this.title,
      header: this._pageHeader,
      content: this.convertedPageContent(),
      charts: this.charts
    }
  }

  build() {
    throw new NotImplementedError()
  }

  /** Returns string of html content elements
   * @return {String}
   */
  convertedPageContent() {
    if (this._pageContent.length > 0) {
      return this._pageContent.join('')
    }
    return null
  }

  /** Adjusts default dashboard content as a pageHeader
   * 
   */
  async addDefaultDashboard() {
    this._pageHeader =  await new Renderer('pages/defaultDashboard').render()
  }

  /** Adjusts overview content as a pageHeader
   * 
   */
  async addOverview(title = '', subtitle = '') {
    this._pageHeader = await  new Renderer('partials/overview', { title, subtitle }).render()
  }

  /** Adds canvas chart to the page content
   * 
   */
  async addChart(options) {
    const { columns = 12, offset, config } = options
    this.charts[config.name] = config
    await this.addPartialContent('partials/chart', { columns, offset, config })
  }

  /** Adds info list element to the page content
   * 
   */
  async addInfoList({ items = [], columns = 12, offset = 0, title = '', subtitle = '' }) {
    await this.addPartialContent('partials/infoList', { items, columns, offset, title, subtitle})
  }

  /** Adds info table element to the page content
   * 
   */
  async addInfoTable({ title = '', columns = 12, items = [], offset = 0, headers = [] }) {
    await this.addPartialContent('partials/infoTable', { title, columns, items, offset, headers })
  }

  /** Adds text box element to the page content
   * 
   */
  async addTextBox({ title = '', content = '', columns = 12, offset = 0 }) {
    await this.addPartialContent('partials/textBox', { title, content, columns, offset })
  }

  /** Adds compiled html elements to the page content
   *  Developer can declare specific pug view @param view which will be returned as HTML
   *  @param data is passed to the declared view 
   */ 
  async addPartialContent(view, data) {
    const partialContent = await new Renderer(view, data).render()
    this._pageContent.push(partialContent)
  }

  /**
   * Adds block element to the page content
   * Developer can declare specific color of block's content @param {String} color
   */
  async addBlock({ columns = 12, offset = 0, title = '', icon = '', value = ''}, color = this.colorTypes.info) {
    await this.addPartialContent('partials/block', { columns, offset, title, icon, value, color })
  }
}

module.exports = PageBuilder