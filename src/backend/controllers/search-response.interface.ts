/**
 * @typedef {Object} SearchResponse
 * @memberof ApiController
 * @property {Array} records
 * @property {String} records[].title
 * @property {String} records[].id
 */

export default interface SearchResponse {
  records: Array<{
    title: string;
    id: string;
  }>;
}
