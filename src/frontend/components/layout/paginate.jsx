import React from 'react'
import JWPaginate from 'jw-paginate'
import styled from 'styled-components'
import { withRouter, Link } from 'react-router-dom'

import StyledButton from './styled-button'
import { colors } from '../../styles/variables'

const PaginationWrapper = styled.div.attrs({
  className: 'level-item pagination-content',
})`
  & > .pagination {
    border: 1px solid ${colors.border};
    padding: 4px;
  }
`

class Paginate extends React.PureComponent {
  linkToPage(page) {
    const { location } = this.props
    const search = new URLSearchParams(location.search)
    search.set('page', page)
    return search.toString()
  }

  render() {
    const { total, page, perPage } = this.props
    const currentPage = parseInt(page || 1, 10)
    const paginate = JWPaginate(total, currentPage, parseInt(perPage, 10))

    const isFirstPage = currentPage === paginate.startPage
    const isLastPage = currentPage === paginate.endPage

    const prevPage = isFirstPage ? currentPage : currentPage - 1
    const nextPage = isLastPage ? currentPage : currentPage + 1

    if (paginate.totalPages === 1) {
      return null
    }
    return (
      <PaginationWrapper>
        <div className="pagination">
          <StyledButton
            to={{ search: this.linkToPage(prevPage) }}
            className={`button is-white${isFirstPage ? ' disabled' : ''}`}
          >
            <i className="icomoon-pagination-left" />
          </StyledButton>
          {paginate.pages.map(p => (
            <StyledButton
              key={p}
              to={{ search: this.linkToPage(p) }}
              className={`pages button is-white${p === currentPage ? ' is-primary' : ''}`}
            >
              {p}
            </StyledButton>
          ))}
          <StyledButton
            to={{ search: this.linkToPage(nextPage) }}
            className={`button is-white${isLastPage ? ' disabled' : ''}`}
          >
            <i className="icomoon-pagination-right" />
          </StyledButton>
        </div>
      </PaginationWrapper>
    )
  }
}


export default withRouter(Paginate)
