import React from 'react'

import JWPaginate from 'jw-paginate'
import { withRouter, Link } from 'react-router-dom'

class Paginate extends React.PureComponent {
  linkToPage(page) {
    const search = new URLSearchParams(this.props.location.search)
    search.set('page', page)
    return search.toString()
  }

  render() {
    const paginate = JWPaginate(this.props.total, parseInt(this.props.page || 1), parseInt(this.props.perPage))
    const isFirstPage = paginate.currentPage == paginate.startPage
    const isLastPage = paginate.currentPage == paginate.endPage
    if (paginate.totalPages === 1) {
      return null
    }
    return (
      <div className="level-item pagination-content">
        <div className="pagination">
          <Link to={{search: this.linkToPage(parseInt(paginate.currentPage) - 1)}} className={`button is-white${isFirstPage ? ' disabled' : ''}`}>
            <i className="icomoon-pagination-left"></i>
          </Link>
          {paginate.pages.map(page => {
            return (
              <Link
                key={page}
                to={{search: this.linkToPage(page)}}
                className={`pages button is-white${page == paginate.currentPage ? ' active' : ''}`}
                >
                {page}
              </Link>
            )
          })}
          <Link to={{search: this.linkToPage(parseInt(paginate.currentPage) + 1)}} className={`button is-white${isLastPage ? ' disabled' : ''}`}>
            <i className="icomoon-pagination-right"></i>
          </Link>
        </div>
      </div>
    )
  }
}


export default withRouter(Paginate)
