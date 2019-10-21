import React, { ReactNode } from 'react'
import JWPaginate from 'jw-paginate'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import StyledLink from './styled-link'

const PaginationWrapper = styled.div.attrs({
  className: 'level-item pagination-content',
})`
  & > .pagination {
    border: 1px solid ${({ theme }): string => theme.colors.border};
    padding: 4px;
  }
`
/**
 * Pagination component
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
class Paginate extends React.PureComponent<RouteComponentProps & Props> {
  linkToPage(page: number): string {
    const { location } = this.props
    const search = new URLSearchParams(location.search)
    search.set('page', page.toString())
    return search.toString()
  }

  render(): ReactNode {
    const { total, page, perPage } = this.props
    const currentPage = page || 1
    const paginate = JWPaginate(total, currentPage, perPage)

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
          <StyledLink
            to={{ search: this.linkToPage(prevPage) }}
            className={`button is-white${isFirstPage ? ' disabled' : ''}`}
          >
            <i className="icomoon-pagination-left" />
          </StyledLink>
          {paginate.pages.map(p => (
            <StyledLink
              key={p}
              to={{ search: this.linkToPage(p) }}
              className={`pages button is-white${p === currentPage ? ' is-primary' : ''}`}
            >
              {p}
            </StyledLink>
          ))}
          <StyledLink
            to={{ search: this.linkToPage(nextPage) }}
            className={`button is-white${isLastPage ? ' disabled' : ''}`}
          >
            <i className="icomoon-pagination-right" />
          </StyledLink>
        </div>
      </PaginationWrapper>
    )
  }
}

/**
 * @memberof Paginate
 */
type Props = {
  /**
   * Current page
   */
  page: number;
  /**
   * Items per page
   */
  perPage: number;
  /**
   * Total number of items
   */
  total: number;
}

export default withRouter(Paginate)
