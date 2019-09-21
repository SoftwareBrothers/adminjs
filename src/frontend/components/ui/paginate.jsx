import React from 'react'
import PropTypes from 'prop-types'
import JWPaginate from 'jw-paginate'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import StyledButton from './styled-button'
import { locationType } from '../../types'

const PaginationWrapper = styled.div.attrs({
  className: 'level-item pagination-content',
})`
  & > .pagination {
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 4px;
  }
`
/**
 * Component which renders pagination
 *
 * @component
 * @example
 * const location = { search: ''}
 * return (
 *   <WrapperBox>
 *     <Paginate total={100} page={4} perPage={10} location={location} />
 *   </WrapperBox>
 * )
 */
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

    if (paginate.totalPages === 1 || total === 0) {
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

Paginate.propTypes = {
  /**
   * Current page
   */
  page: PropTypes.number.isRequired,
  /**
   * Items per page
   */
  perPage: PropTypes.number.isRequired,
  /**
   * Total number of items
   */
  total: PropTypes.number.isRequired,
  /**
   * Location passed from the react-router
   */
  location: locationType.isRequired,
}

export default withRouter(Paginate)
