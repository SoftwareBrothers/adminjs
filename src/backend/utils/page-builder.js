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

  /** Returns string from joined and wrapped  html elements array
   * @return {String}
   */
  convertedPageContent() {
    if (this.pageContent.length > 0) {
      const pageContentAsString = this.pageContent.join('')
      return `<div class="columns is-multiline dashboard-content">${pageContentAsString}</div>`
    }
    return null
  }

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

  /**
   * Adds html element to pageContent
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
