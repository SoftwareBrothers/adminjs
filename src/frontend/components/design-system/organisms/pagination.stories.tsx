/* eslint-disable import/prefer-default-export */
import React from 'react'
import { Pagination } from './pagination'

export const PaginationStory = () => (
  <Pagination page={2} perPage={10} total={2013} onChange={() => console.log('changed')} />
)
