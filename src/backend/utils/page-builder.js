/* eslint-disable class-methods-use-this */
const NotImplementedError = require('../utils/not-implemented-error')

/* eslint-disable object-curly-newline */
/* eslint-disable indent */
/**
 * PageBuilder class contains methods which allows you to create HTML content as JavaScript string
 *
 * @example
 *
 * const { PageBuilder } = require('admin-bro')
 * const ArticleModel = require('./../mongoose/article-model')
 * const UserModel = require('./../mongoose/user-model')
 *
 * class DashboardPage extends PageBuilder {
 *   constructor(props) {
 *     super(props)
 *     this.title = 'Collections overview',
 *     this.subtitle = 'stats'
 *   }
 *
 *   async build() {
 *     const articlesCount = await ArticleModel.countDocuments()
 *     const publishedArticlesCount = await ArticleModel.find({ published: true }).countDocuments()
 *     const unpublishedArticlesCount = articlesCount - publishedArticlesCount
 *     const usersCount = await UserModel.countDocuments()
 *     this.addInfoBlock({
 *       title: 'The number of all articles',
 *       value: articlesCount,
 *       icon: 'fas fa-arrow-alt-circle-up fa-2x',
 *       columns: 3,
 *     })
 *     this.addSuccesBlock({
 *       title: 'Published articles',
 *       value: publishedArticlesCount,
 *       icon: 'fas fa-star fa-2x',
 *       columns: 3
 *     })
 *     this.addWarningBlock({
 *       title: 'Unpublished articles',
 *       value: unpublishedArticlesCount,
 *       icon: 'fas fa-arrow-alt-circle-down fa-2x',
 *       columns: 3
 *     })
 *     this.addInfoBlock({
 *       title: 'The number of users',
 *       value: usersCount,
 *       icon: 'fas fa-star fa-2x',
 *       columns: 3
 *     })
 *     return {
 *       title: this.title,
 *       subtitle: this.subtitle,
 *       content: this.convertedPageContent()
 *     }
 *   }
 * }
 *
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
    this.title = null
    this.subtitle = null
    this.charts = {}
    this.types = {
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
      subtitle: this.subtitle,
      content: this.convertedPageContent(),
      charts: this.charts,
    }
  }

  build() {
    throw new NotImplementedError()
  }

  /** Returns string from joined and wrapped array of html elements
   * @return {String}
   */
  convertedPageContent() {
    if (this._pageContent.length > 0) {
      const pageContentAsString = this._pageContent.join('')
      return `<div class="columns is-multiline dashboard-content"> ${pageContentAsString} </div>`
    }
    return null
  }

  addChart(options) {
    const { columns, offset, config } = options
    const chart = `
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset || 0}"> 
        <canvas class="chart" data-chart=${config.name}> 
        </canvas>
      </div>`
    this._pageContent.push(chart)
    this.charts[config.name] = config
  }

  addInfoList(options) {
    const { items, columns, offset, title, subtitle } = options
    const itemsContent = items.map(item => this.getInfoListItem(item))
    const infoList = `
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset || 0}"> 
        <div class="info-list border-box">
          <div class="h2">
            ${title}
          </div>
          <div class="info-subtitle">
            ${subtitle}
          </div>
          <div class="items">
            ${itemsContent.join('<div class="item-spacer"> </div>')}
          </div>
        </div>
      </div>`
    this._pageContent.push(infoList)
  }

  getStatusHtml(status) {
    const statusHtml = `
      <div class="status ${status}">
        ${status.toUpperCase()}
      </div>`
    return statusHtml
  }

  // eslint-disable-next-line class-methods-use-this
  getInfoListItem(item) {
    const { title, subtitle, content, status, date, imgSrc } = item
    const imgHtml = `
      <div class="item-img">
        <img src=${imgSrc}>
        </img>
      </div>
    `
    const htmlItem = `
      <div class="item"> 
        ${imgSrc ? imgHtml : ''} 
        <div class="item-text">
          <div class="item-title">
            ${title || ''}
          </div>
          <div class="item-content">
            ${subtitle || ''}
          </div>
            ${content || ''}
          <div class="item-bottom">
            <div class="date">
              ${date || ''}
            </div>
            ${status ? this.getStatusHtml(status) : ''}
          </div>
        </div>
      </div>
    `
    return htmlItem
  }

  addInfoTable(options) {
    const { title, columns, items, offset, headers } = options
    const headersHtml = headers.map(header => `<th class="text-small"> ${header} </th>`)
    const tableRows = items.map(item => `
      <tr> 
        ${
          headers.map(header => `<td> ${header === 'status' && item[header]
              ? this.getStatusHtml(item[header]) : item[header]} 
            </td>`).join('')
        }
      </tr>`)
    const infoTable = `
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset || 0}"> 
        <div class="border-box">
          <div class="column h2">
            ${title}
          </div>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                ${headersHtml.join('')}
            </thead>
            <tbody>
              ${tableRows.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `
    this._pageContent.push(infoTable)
  }

  addTextBox(options) {
    const { title, content, columns, offset } = options
    const textHtml = `
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset || 0}"> 
        <div class="border-box">
          <div class="h2">
            ${title}
          </div>
          <div class="content">
            ${content}
          </div>
        </div>
      </div> 
      `
    this._pageContent.push(textHtml)
  }

  /**
   * Adds html element to pageContent
   * Developer can declare size @param options.size and offset of each column individually
   * title, icon, and of block @param options.size
   * @param {Object} options parts of a block element
   * @param {String} color block color
   */
  addBlock(options, color) {
    // eslint-disable-next-line object-curly-newline
    const { columns, offset, title, icon, value } = options
    const block = ` 
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset || 0}"> 
        <div class="dashboard-block border-box">
          <div class="block-title">
            ${title}
          </div>
          <div class="block-content" style="color:${color}">
            <div class="value">
              ${value}
            </div>
            <i class="${icon}">
            </i>
          </div>
        </div>
      </div>
    `
    this._pageContent.push(block)
  }
}

module.exports = PageBuilder
