/* eslint object-curly-newline: 0 */
const Renderer = require('../../backend/utils/renderer')
const NotImplementedError = require('../utils/not-implemented-error')

/**
 * Base class for all Pages in the AdminBro.
 *
 * ### Extending the __PageBuilder__ class
 *
 * To create your own Page you have to extend this class and override
 * {@link PageBuilder#build build()} abstract method.
 *
 * Example DashboardPage which change __title__ and __subtitle__ of the header block and adds one
 * simple widget by using {@link PageBuilder#addBlock addBlock} method.
 * ```
 * const { PageBuilder } = require('admin-bro')
 *
 * class DashboardPage extends PageBuilder {
 *   constructor(props) {
 *     super(props)
 *     this.title = 'Custom dashboard'
 *     this.subtitle = 'This is just an example what can be done using AdminBro'
 *   }
 *
 *   async build() {
 *     this.addBlock({
 *       title: 'Published Articles',
 *       value: this.articlesCount.published,
 *       icon: 'fas fa-newspaper fa-2x',
 *       columns: 3,
 *     })
 *   }
 * }
 *
 * module.exports = DashboardPage
 * ```
 *
 * ### Initialize __PageBuilder__ and render html via __toHTML()__
 *
 * The other option of using PageBuilder is to simply initialize it and
 * then use {@link PageBuilder#toHTML}
 *
 * ```
 * const page = new AdminBro.PageBuilder({ admin })
 * page.addBlock({
 *   title: 'Published Articles',
 *   value: this.articlesCount.published,
 *   icon: 'fas fa-newspaper fa-2x',
 *   columns: 3,
 * })
 * page.toHTML()
 * ```
 *
 * ### Available Widgets
 *
 * There you can use all available widgets:
 * - {@link PageBuilder#addBlock addBlock}
 * - {@link PageBuilder#addChart addChart}
 * - {@link PageBuilder#addInfoList addInfoList}
 * - {@link PageBuilder#addInfoTable addInfoTable}
 * - {@link PageBuilder#addTextBox addTextBox}
 * - {@link PageBuilder#addWelcomeBlock addWelcomeBlock}
 *
 * ### Adding to the settings
 *
 * You can pass class you created to AdminBro via {@link AdminBroOptions}:
 * ```
 * const DashboardPage = require('./dashboard-page')
 *
 * const adminBroOptions = {
 *   ...
 *   databases: [...],
 *   resources: [...],
 *   dashboard: DashboardPage,
 *   rootPath: '/admin'
 *   ...
 * }
 * ```
 */
class PageBuilder {
  /**
   * @param  {AdminBro}     options.admin  current instance of AdminBro
   */
  constructor({ admin }) {
    this._admin = admin

    /**
     * @type {Array<String>}
     * @description _pageContent   array of html elements as String
     * @private
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
  }

  /**
   * Returns object with page settings
   * @return {Promise<Object>}
   */
  async render() {
    await this.build()
    return {
      title: this.title,
      subtitle: this.subtitle,
      content: this.toHTML(),
    }
  }

  /**
   * Renders all widgets to HTML
   */
  toHTML() {
    return [
      '<div class="columns is-multiline page-builder-content">',
      this._pageContent.join(''),
      '</div>',
    ].join('\n')
  }

  /**
   * This method is responsible for building the page, should be overriden
   *
   * @abstract
   * @throws { NotImplementedError } When the method is not implemented by it's subclass
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
   * ##### Example Widget:
   *
   * <img src="images/add-chart.png" alt="addChart" width="600"/>
   *
   * @see http://www.chartjs.org
   *
   * @param {Object} options
   * @param {String} options.title
   * @param {String} options.subtitle
   * @param {Number} [options.columns=12]   number of columns on which widget should visible
   * @param {Number} [options.offset=0]     column offset
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
    this.addPartialContent('partials/chart', { columns, offset, title, subtitle, config })
  }

  /**
   * Adds info list widget to the page content
   *
   * ##### Example Widget:
   *
   * <img src="images/add-info-list.png" alt="addInfoList" width="400"/>
   *
   * @param {Object}    options
   * @param {Object[]}  options.items
   * @param {String}    options.items[].title
   * @param {String}    options.items[].subtitle
   * @param {String}    options.items[].status
   * @param {String}    options.items[].imgSrc
   * @param {String}    options.items[].date
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
   * ##### Example Widget:
   *
   * <img src="images/add-info-table.png" alt="addInfoTable" width="800"/>
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
   * ##### Example Widget:
   *
   * <img src="images/add-text-box.png" alt="addTextBox" width="600"/>
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
   * Adds raw content to the page (withouth any borders and backgrounds)
   *
   * @param {Object} options
   * @param {String} options.content
   * @param {Number} options.columns=12     number of columns on which widget should visible
   * @param {Number} options.offset=0       column offset
   */
  addColumn({ content = '', columns = 12, offset = 0 }) {
    this.addPartialContent('partials/column', { content, columns, offset })
  }

  /**
   * Adds compiled html elements to the page content
   * Developer can declare specific pug view @param view which will be returned as HTML
   *
   * @param {String} view      pug template url relative to frontend/views
   *                            without the .pug extension
   * @param {Object} data      data passed to the pug renderer
   * @private
   */
  addPartialContent(view, data) {
    const partialContent = new Renderer().render(view, data)
    this._pageContent.push(partialContent)
  }

  /**
   * Adds The Simplest block widget to the page content
   *
   * ##### Example Widget:
   *
   * <img src="images/add-block.png" alt="addBlock" width="300"/>
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
 * Definition of commonly used colors for widgets.
 * It contains following keys:
 * - WARNING
 * - DANGER
 * - SUCCESS
 * - INFO
 * @type {Object}
 * @example
 * addBlock({}, PageBuilder.COLOR.INFO)
 */
PageBuilder.COLOR = {
  WARNING: '#ff9f89',
  DANGER: '#f0616f',
  SUCCESS: '#21c197',
  INFO: '#718af4',
}

module.exports = PageBuilder
