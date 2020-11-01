/* eslint-disable no-useless-constructor */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint class-methods-use-this: 0 no-unused-vars: 0 */

import BaseResource from '../resource/base-resource'
import NotImplementedError from '../../utils/errors/not-implemented-error'

/**
 * Representation of an ORM database in AdminBro
 * @category Base
 *
 * @mermaid
 *   graph LR
 *   A[BaseDatabase] -->|has many| B(BaseResource)
 *   B --> |has many|C(BaseRecord)
 *   B --> |has many|D(BaseProperty)
 */
class BaseDatabase {
  constructor(database: any) {}

  /**
   * Checks if given adapter supports database provided by user
   *
   * @param  {any}  database    database provided in AdminBroOptions#databases array
   * @return {Boolean}          if given adapter supports this database - returns true
   */
  static isAdapterFor(database: any): boolean {
    throw new NotImplementedError('BaseDatabase.isAdapterFor')
  }

  /**
   * returns array of all resources (collections/tables) in the database
   *
   * @return {BaseResource[]}
   */
  resources(): Array<BaseResource> {
    throw new NotImplementedError('BaseDatabase#resources')
  }
}

export default BaseDatabase
