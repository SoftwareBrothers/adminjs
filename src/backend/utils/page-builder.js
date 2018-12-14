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
    this.pageContent = []
  }

  /**
   * Returns string of HTML elements
   * Can be overwritten in custom pages
   * @return {String}
   */
  build() {
    return this.convertedPageContent()
  }

  /** Returns string from joined and wrapped array of html elements
   * @return {String}
   */
  convertedPageContent() {
    if (this.pageContent.length > 0) {
      const pageContentAsString = this.pageContent.join('')
      return `<div class="columns is-multiline dashboard-content"> ${pageContentAsString}</div>`
    }
    return null
  }

  /** Allows develepors to pick blocks in special colors
   * Same for:
   * @method addDangerBlock
   * @method addSuccesBlock
   * @method addWarningBlock
   * @param  {Object} options
   */
  addInfoBlock(options) {
    this.addBlock(options, { color: '#718af4' })
  }

  addSuccesBlock(options) {
    this.addBlock(options, { color: '#21c197' })
  }

  addWarningBlock(options) {
    this.addBlock(options, { color: '#ff9f89' })
  }

  addDangerBlock(options) {
    this.addBlock(options, { color: '#f0616f' })
  }

  addChart(options) {
    const chart = '<div class="column is-12-tablet column is-6-desktop">-<canvas class="chart" id="myChart"></canvas></div>'
    this.pageContent.push(chart)
  }

  addInfoList(options) {
    // eslint-disable-next-line object-curly-newline
    const { items, columns, offset, title, subtitle } = options
    const itemsContent = []
    items.forEach((item) => {
      itemsContent.push(this.addInfoListItem(item))
    })
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

    this.pageContent.push(infoList)
  }

  // eslint-disable-next-line class-methods-use-this
  addInfoListItem(item) {
    const { title, subtitle, content, status, imgSrc } = item
    const imgHtml = `
      <div class="item-img">
        <img src=${imgSrc}>
        </img>
      </div>
      `
    const statusHtml = `
      <div class="item-status">
        ${status}
      </div>`
    const htmlItem = `
      <div class="item"> 
        ${imgSrc ? imgHtml : ''} 
        <div class="item-text">
          <div class="item-title">
            ${title}
          </div>
          <div class="item-content">
            ${subtitle}
          </div>
            ${content || ''}
          ${status ? statusHtml : ''}
        </div>
      </div>
      `
    return htmlItem
  }

  addInfoTable(options) {
    const { title, columns, items, offset, headers } = options
    const headersHtml = headers.map(header => `<th class="text-small"> ${header} </th>`)
    const tableRow = items.map(item => `
      <tr> 
        ${
          headers.map(header => `<td> ${item[header]} </td>`).join('')
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
            ${tableRow.join('')}
          </tbody>
        </table>
      </div>
    </div>
    `
    this.pageContent.push(infoTable)
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
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset || 0}"> 
      `
    this.pageContent.push(textHtml)
  }

  /**
   * Adds html element to pageContent
   * Developer can declare size @param options.size and offset of each column individually
   * title, icon, and of block @param options.size
   * @param {Object} options parts of a block element
   * @param {String} color block color
   */
  addBlock(options, { color }) {
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
      </div>`
    this.pageContent.push(block)
  }
}

module.exports = PageBuilder
