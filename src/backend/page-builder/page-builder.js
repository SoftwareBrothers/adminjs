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
    this.pageContent = []
  }

  /**
   * Returns string of HTML elements
   * Can be overwritten in custom pages
   * @return {String}
  */
  async build() {
    return this.convertedPageContent()
  }

  /** Returns joined and wrapped array of html elements
   * @return {String}
  */
  convertedPageContent() {
    if (this.pageContent) {
      const pageContentAsString = this.pageContent.join('')
      return `<div class="columns is-multiline dashboard-content">${pageContentAsString}</div>`
    }
    return ''
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
   * Adds html blocks as a string to pageContent
   * @param {Object} options parts of a block element
   * @param {String} color block color
   */
  addBlock(options, { color }) {
    // eslint-disable-next-line object-curly-newline
    const { columns, offset, title, icon, value } = options
    const block = ` 
      <div class="column is-12-tablet is-${columns}-desktop is-offset-${offset}"> 
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
