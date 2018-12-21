/* eslint object-curly-newline: 0 */
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
      content: this._pageContent.join(''),
      charts: this.charts,
    }
  }

  /**
   * This method is responsible for building the page, should be overriden
   */
  build() {
    throw new NotImplementedError(this.constructor.name)
  }

  /**
   * Adds default welcome block widget to the page
   */
  addWelcomeBlock() {
    this.addPartialContent('partials/welcomeBlock', {})
  }

  /**
   * Adds canvas chart to the page content based on chart.js library
   *
   * @link http://www.chartjs.org
   *
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.subtitle
   * @param {Number} options.columns=12     number of columns on which widget should visible
   * @param {Number} options.offset=0       column offset
   * @param {Object} options.config         chart.js config
   *
   * @example
   * async build(){
   *   this.addChart({
   *     columns: 6,
   *     title: 'Articles',
   *     subtitle: 'Summary for all articles',
   *     config: {
   *       type: 'bar',
   *       data: {
   *         datasets: [
   *           {
   *             label: 'Published',
   *             fill: true,
   *             backgroundColor: PageBuilder.COLOR.INFO,
   *             data: [this.articlesCount.published]
   *           }, {
   *             label: 'Not Published',
   *             fill: true,
   *             backgroundColor: PageBuilder.COLOR.WARNING,
   *             data: [this.articlesCount.unpublished]
   *           },
   *         ],
   *       },
   *     }
   *   })
   * }
   */
  addChart({ title, subtitle, columns = 12, offset = 0, config = {} }) {
    this.charts[title] = config
    this.addPartialContent('partials/chart', { columns, offset, title, subtitle, config })
  }

  /**
   * Adds info list widget to the page content
   *
   * @param {Object}    options
   * @param {Object[]}  options.items
   * @param {Object[]}  options.items[].title
   * @param {Object[]}  options.items[].subtitle
   * @param {Object[]}  options.items[].status
   * @param {Object[]}  options.items[].imgSrc
   * @param {Object[]}  options.items[].date
   * @param {Number}    options.columns=12     number of columns on which widget should visible
   * @param {Number}    options.offset=0       column offset
   * @param {String}    options.title
   * @param {String}    options.subtitle
   *
   * @example
   * async build(){
   *   this.addInfoList({
   *     title: 'Recent comments',
   *     subtitle: 'Latest comments from user all around the world',
   *     columns: 4,
   *     items: (await CommentModel.find({}).limit(3).sort({createdAt: 'desc'})).map(comment => ({
   *       title: comment.content,
   *       subtitle: comment.createdBy,
   *       date: moment(comment.createdAt).format('YYYY-MM-DD HH:MM'),
   *       status: comment.flagged && 'flagged',
   *       imgSrc: 'http://www.question2answer.org/qa/?qa=image&qa_blobid=18247718293145324634&qa_size=40',
   *     }))
   *   })
   * }
   */
  addInfoList({ items = [], columns = 12, offset = 0, title = '', subtitle = '' }) {
    this.addPartialContent('partials/infoList', { items, columns, offset, title, subtitle })
  }

  /**
   * Adds info table widget to the page content
   *
   * @param {Object}     options
   * @param {String}     options.title
   * @param {Number}     options.columns=12 number of columns on which widget should visible
   * @param {Number}     options.offset=0   column offset
   * @param {String[]}   options.headers    table headers
   * @param {String[][]} options.items      table items
   *
   * @example
   * async build(){
   *   this.addInfoTable({
   *     title: 'Articles',
   *     headers: ['Title', 'Author', 'Published', 'Creation date'],
   *     items: (await ArticleModel.find({}).sort({createdAt: 'desc'}).limit(5)).map(article => ([
   *       article.title,
   *       article.author,
   *       article.published ? 'YES' : 'NO',
   *       moment(article.createdAt).format('YYYY-MM-DD HH:MM'),
   *     ])),
   *     columns: 8,
   *   })
   * }
   */
  addInfoTable({ title = '', columns = 12, items = [], offset = 0, headers = [] }) {
    this.addPartialContent('partials/infoTable', { title, columns, items, offset, headers })
  }

  /**
   * Adds simple text box widget to the page content
   *
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.content
   * @param {Number} options.columns=12     number of columns on which widget should visible
   * @param {Number} options.offset=0       column offset
   */
  addTextBox({ title = '', content = '', columns = 12, offset = 0 }) {
    this.addPartialContent('partials/textBox', { title, content, columns, offset })
  }

  /**
   *  Adds compiled html elements to the page content
   *  Developer can declare specific pug view @param view which will be returned as HTML
   *
   *  @param {String} view      pug template url relative to frontend/views
   *                            without the .pug extension
   *  @param {Object} data      data passed to the pug renderer
   */
  addPartialContent(view, data) {
    const partialContent = new Renderer(view, data).render()
    this._pageContent.push(partialContent)
  }

  /**
   * Adds text block element to the page content
   *
   * @param {Object} options
   * @param {Number} options.columns=12     number of columns on which widget should visible
   * @param {Number} options.offset=0       column offset
   * @param {String} options.title
   * @param {String} options.icon           class for an icon
   * @param {String} options.value          string plased in the core of the widget
   * @param {String} color=PageBuilder.COLOR.INFO   color hex for the font.
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
