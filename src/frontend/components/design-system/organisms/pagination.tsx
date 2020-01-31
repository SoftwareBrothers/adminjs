import React from 'react'
import styled from 'styled-components'
import JWPaginate from 'jw-paginate'

import { Box } from '../atoms/box'
import { Button, ButtonProps } from '../atoms/button'
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

  onChange: (pageNumber: number) => void;
}

const PaginationLink = styled(Button).attrs((props: ButtonProps) => ({
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
  border: 1px solid ${({ theme }): string => theme.colors.grey40};
  & > :first-child {
    width: 56px;
    border-right: 1px solid ${({ theme }): string => theme.colors.grey40};
  }
  & > :nth-child(2) {
    padding-left: 16px;
  }
  & > :last-child {
    width: 56px;
    border-left: 1px solid ${({ theme }): string => theme.colors.grey40};
  }
  & > :nth-last-child(2) {
    padding-right: 16px;
  }
`

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { total, page, perPage, onChange, ...rest } = props
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
    <PaginationWrapper {...rest}>
      <PaginationLink
        disabled={isFirstPage}
        onClick={(): void => (!isFirstPage ? onChange(prevPage) : undefined)}
      >
        <Icon icon="ChevronLeft" />
      </PaginationLink>
      {paginate.pages.map(p => (
        <PaginationLink
          key={p}
          onClick={(): void => onChange(p)}
          variant={p === currentPage ? 'primary' : 'text'}
        >
          {p}
        </PaginationLink>
      ))}
      <PaginationLink
        onClick={(): void => (!isLastPage ? onChange(nextPage) : undefined)}
        disabled={isLastPage}
      >
        <Icon icon="ChevronRight" />
      </PaginationLink>
    </PaginationWrapper>
  )
}
