type ErrorMessage = { message: string }

/**
 * JSON representation of an record
 */
export default interface RecordJSON {
  /**
   * all flatten params of given record
   */
  params: Record<string, any>;
  /**
   * If the record has properties which are references - here there will be populated records
   */
  populated: Record<string, RecordJSON> | {};
  /**
   * List of all validation errors
   */
  errors: Record<string, ErrorMessage> | {};
  /**
   * Uniq Id of a record
   */
  id: string;
  /**
   * Title of an record
   */
  title: string;
}

// TODO: describe flatten params
