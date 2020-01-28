import React from 'react'
import styled from 'styled-components'
import JWPaginate from 'jw-paginate'

import { Box } from '../atoms/box'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'

export type PaginationProps = {
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
  /**
   * location
   */
  location?: Location;
}

const PaginationLink = styled(Button).attrs(props => ({
  size: 'icon',
  variant: props.variant ? props.variant : 'text',
}))`
  min-width: 28px;
  height: 28px;
  line-height: 12px;
  padding: 3px 6px;
  text-align: center;
`

const PaginationWrapper = styled(Box)`
  display: inline-block;
  padding: 2px;
  border: 1px solid ${({ theme }): string => theme.colors.greyLight};
  & > :first-child {
    width: 56px;
    border-right: 1px solid ${({ theme }): string => theme.colors.greyLight};
  }
  & > :nth-child(2) {
    padding-left: 16px;
  }
  & > :last-child {
    width: 56px;
    border-left: 1px solid ${({ theme }): string => theme.colors.greyLight};
  }
  & > :nth-last-child(2) {
    padding-right: 16px;
  }
`

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { total, page, perPage } = props
  const currentPage = page || 1
  const paginate = JWPaginate(total, currentPage, perPage)

  const isFirstPage = currentPage === paginate.startPage
  const isLastPage = currentPage === paginate.endPage

  const prevPage = isFirstPage ? currentPage : currentPage - 1
  const nextPage = isLastPage ? currentPage : currentPage + 1

  const linkToPage = (pageNumber: number): string => {
    const { location } = props
    const search = new URLSearchParams(location && location.search)
    search.set('page', pageNumber.toString())
    return search.toString()
  }

  if (paginate.totalPages === 1 || total === 0) {
    return null
  }

  return (
    <PaginationWrapper>
      <PaginationLink
        to={{ search: linkToPage(prevPage) }}
        disabled={isFirstPage}
      >
        <Icon icon="ChevronLeft" />
      </PaginationLink>
      {paginate.pages.map(p => (
        <PaginationLink
          key={p}
          to={{ search: linkToPage(p) }}
          variant={p === currentPage ? 'primary' : 'text'}
        >
          {p}
        </PaginationLink>
      ))}
      <PaginationLink
        to={{ search: linkToPage(nextPage) }}
        disabled={isLastPage}
      >
        <Icon icon="ChevronRight" />
      </PaginationLink>
    </PaginationWrapper>
  )
}
