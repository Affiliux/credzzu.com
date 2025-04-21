/**
 *
 * @name Pagination
 * @category Application - Pagination
 *
 */

export interface PaginationPayloadProps {
  page: number
  limit: number
}

export interface PaginationResponseProps {
  page: number
  limit: number
  itemCount: number
  pageCount: number
  hasPreviousPage: boolean
  hasNextPage: boolean
}
