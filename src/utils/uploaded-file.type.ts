/**
 * File uploaded via FormData to the backend.
 *
 * @memberof AdminJS
 * @alias UploadedFile
 */
export type UploadedFile = {
  /**
   * The size of the uploaded file in bytes.
   * this property says how many bytes of the file have been written to disk yet.
   */
  size: number;
  /**
   * The path this file is being written to.
   */
  path: string;

  /**
   * The mime type of this file, according to the uploading client.
   */
  type: string;

  /**
   * The name this file had according to the uploading client.
   */
  name: string | null;
}
