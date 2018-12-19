/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
const Renderer = require('../../backend/utils/renderer')
const NotImplementedError = require('../utils/not-implemented-error')
/**
 * PageBuilder class contains methods which allows you to create page content
 */

class PageBuilder {
  /**
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   */
  constructor({ admin }) {
    this._admin = admin

    /**
     * @type {String[]}
     * @description _pageContent   array of html elements as String
     */
    this._pageContent = []

    /**
     * @type {String}
     * @description _pageHeader    html element as String
     */
    this._pageHeader = ''

    /**
     * @type {String}
     * @description page title - what will be on the header
     */
    this.title = null

    /**
     * @type {String}
     * @description page subtitle
     */
    this.subtitle = null

    /**
     * @type {Object}
     * @description mapped object contains chart's settings
     */
    this.charts = {}
  }

  /**
   * Returns object with page settings
   * @return {Object}
   */
  async render() {
    await this.build()
    return {
      title: this.title,
      subtitle: this.subtitle,
      header: this._pageHeader,
      content: this._pageContent.join(''),
      charts: this.charts,
    }
  }

  /**
   * This method is responsible for building the page, should be overriden.
   */
  build() {
    throw new NotImplementedError()
  }

  /**
   * Adjusts default dashboard content as a pageHeader
   */
  setDefaultDashboard() {
    this._pageHeader = new Renderer('pages/defaultDashboard').render()
  }

  /**
   * Adds canvas chart to the page content
   *
   * Config for chart should includes: name, type, data and options
   * name is used in the data attribute of canvas element, the rest of the properties based on chart.js documentation
   * check out {@link http://www.chartjs.org}
   */
  addChart({ title, subtitle, columns = 12, offset = 0, config = {} }) {
    this.charts[title] = config
    this.addPartialContent('partials/chart', { columns, offset, title, subtitle, config })
  }

  /**
   * Adds info list element to the page content
   */
  addInfoList({ items = [], columns = 12, offset = 0, title = '', subtitle = '' }) {
    this.addPartialContent('partials/infoList', { items, columns, offset, title, subtitle })
  }

  /**
   * Adds info table element to the page content
   */
  addInfoTable({ title = '', columns = 12, items = [], offset = 0, headers = [] }) {
    this.addPartialContent('partials/infoTable', { title, columns, items, offset, headers })
  }

  /**
   * Adds text box element to the page content
   */
  addTextBox({ title = '', content = '', columns = 12, offset = 0 }) {
    this.addPartialContent('partials/textBox', { title, content, columns, offset })
  }

  /**
   *  Adds compiled html elements to the page content
   *  Developer can declare specific pug view @param view which will be returned as HTML
   *  @param data is passed to the declared view
   */
  addPartialContent(view, data) {
    const partialContent = new Renderer(view, data).render()
    this._pageContent.push(partialContent)
  }

  /**
   * Adds block element to the page content
   * Developer can declare specific color of block's content @param {String} color
   */
  addBlock({ columns = 12, offset = 0, title = '', icon = '', value = '' }, color = PageBuilder.COLOR.INFO) {
    this.addPartialContent('partials/block', { columns, offset, title, icon, value, color })
  }
}

/**
 * @type {Object}
 * @description specific colors for html blocks
 */
PageBuilder.COLOR = {
  WARNING: '#ff9f89',
  DANGER: '#f0616f',
  SUCCESS: '#21c197',
  INFO: '#718af4',
}

module.exports = PageBuilder
