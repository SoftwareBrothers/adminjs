/* eslint-disable object-curly-newline */
/* eslint-disable class-methods-use-this */
const Renderer = require('../../backend/utils/renderer')
const NotImplementedError = require('../utils/not-implemented-error')
/**
 * PageBuilder class contains methods which allows you to create page content
 * 
 * @example
 * 
 * const { PageBuilder } = require('admin-bro')
 * const ArticleModel = require('./../mongoose/article-model')
 * const UserModel = require('./../mongoose/user-model')
 * const ClientsModel = require('./../mongoose/clients-model')
 * const CommentModel = require('./../mongoose/comment-model')
 * const moment = require('moment')
 * 
 * class DashboardPage extends PageBuilder {
 *   constructor(props) {
 *     super(props)
 *     this.title = 'My dashboard'
 *   }
 * 
 *   async build() {
 *     const maxItems = 10
 *     const articlesCount = await ArticleModel.countDocuments()
 *     const publishedArticlesCount = await ArticleModel.find({ published: true }).limit(maxItems).countDocuments()
 *     const unpublishedArticlesCount = articlesCount - publishedArticlesCount
 *     const usersCount = await UserModel.countDocuments()
 *     const comments = await CommentModel.find({}).limit(maxItems)
 *     const clients = await ClientsModel.find({}).limit(maxItems)
 *     let mappedComments = null
 *     if(comments.length) {
 *       mappedComments = comments.map(comment => { 
 *         return {
 *           title: comment.createdBy,
 *           subtitle: comment.content,
 *           status: comment.status,
 *           imgSrc: comment.imgPath,
 *           date: moment(comment.createdAt).format('YYYY-MM-DD')
 *         }
 *       })
 *     }
 *     await this.setOverview('Collections overview', 'stats')
 *     await this.addBlock({
 *       title: 'The number of all articles',
 *       value: articlesCount,
 *       icon: 'fas fa-arrow-alt-circle-up fa-2x',
 *       columns: 3,
 *     }, this.colorTypes.info)
 *     await this.addBlock({
 *       title: 'Published articles',
 *       value: publishedArticlesCount,
 *       icon: 'fas fa-star fa-2x',
 *       columns: 3
 *     }, this.colorTypes.succes)
 *     await this.addBlock({
 *       title: 'Unpublished articles',
 *       value: unpublishedArticlesCount,
 *       icon: 'fas fa-arrow-alt-circle-down fa-2x',
 *       columns: 3
 *     }, this.colorTypes.warning)
 *     await this.addBlock({
 *       title: 'The number of users',
 *       value: usersCount,
 *       icon: 'fas fa-star fa-2x',
 *       columns: 3
 *     }, this.colorTypes.info)
 *     mappedComments && await this.addInfoTable({
 *       title: 'Table Information',
 *       headers: Object.keys(mappedComments[0]),
 *       items: mappedComments,
 *       columns: 12
 *     })
 *     await this.addTextBox({
 *       title: 'Lorem ipsum text title',
 *       content: `
 *         <div> lorem ipsum contentum textum boxum</div>
 *         <div> lorem ipsum contentum textum boxum</div>
 *         <div> lorem ipsum contentum textum boxum</div>
 *         <div> lorem ipsum contentum textum boxum</div>
 *       `,
 *       columns: 6
 *     })
 *     mappedComments && await this.addInfoList({
 *       title: 'Recent comments',
 *       subtitle: 'Latest comments from user all around the world',
 *       columns: 6,
 *       items: mappedComments
 *     })
 *     await this.addTextBox({
 *       title: 'Simple textbox',
 *       content: '<div> lorem ipsum contentum textum boxum</div>',
 *       columns: 6
 *     })
 *     await this.addChart({
 *       columns: 6,
 *       config: {
 *         name: 'example',
 *         type: 'line',
 *         data: {
 *           labels: clients.map(client => client.month),
 *           datasets: [
 *             {
 *               label: 'label example',
 *               fill: true,
 *               backgroundColor: 'orange',
 *               borderColor: 'tomato',
 *               data: clients.map(client => client.amount),
 *             },
 *           ],
 *         },
 *         options: {
 *           title: {
 *             fontSize: 20,
 *             display: true,
 *             text: 'Title'
 *           },
 *         },
 *       }
 *     })
 *   }    
 * }
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
     * @description page title
     */
    this.title = ''

    /**
     * @type {Object}               
     * @description mapped object contains chart's settings
     */
    this.charts = {}

    /**
     * @type {Object}   
     * @description specific colors for html blocks
     */
    this.colorTypes = {
      warning: '#ff9f89',
      danger: '#f0616f',
      succes: '#21c197',
      info: '#718af4',
    }
  }

  /**
   * Returns object with page settings
   * @return {Object}
   */
  async render() {
    await this.build()
    return {
      title: this.title,
      header: this._pageHeader,
      content: this._pageContent.length > 0 ? this._pageContent.join('') : '',
      charts: this.charts
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
  async setDefaultDashboard() {
    this._pageHeader =  await new Renderer('pages/defaultDashboard').render()
  }

  /** 
   * Adjusts overview content as a pageHeader
   */
  async setOverview(title = '', subtitle = '') {
    this._pageHeader = await  new Renderer('partials/overview', { title, subtitle }).render()
  }

  /** 
   * Adds canvas chart to the page content
   * 
   * Config for chart should includes: name, type, data and options
   * name is used in the data attribute of canvas element, the rest of the properties based on chart.js documentation
   * check out {@link http://www.chartjs.org} 
   */
  async addChart(options) {
    const { columns = 12, offset = 0, config = {} } = options
    this.charts[config.name] = config
    await this.addPartialContent('partials/chart', { columns, offset, config })
  }

  /** 
   * Adds info list element to the page content
   */
  async addInfoList({ items = [], columns = 12, offset = 0, title = '', subtitle = '' }) {
    await this.addPartialContent('partials/infoList', { items, columns, offset, title, subtitle})
  }

  /** 
   * Adds info table element to the page content
   */
  async addInfoTable({ title = '', columns = 12, items = [], offset = 0, headers = [] }) {
    await this.addPartialContent('partials/infoTable', { title, columns, items, offset, headers })
  }

  /** 
   * Adds text box element to the page content
   */
  async addTextBox({ title = '', content = '', columns = 12, offset = 0 }) {
    await this.addPartialContent('partials/textBox', { title, content, columns, offset })
  }

  /**
   *  Adds compiled html elements to the page content
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