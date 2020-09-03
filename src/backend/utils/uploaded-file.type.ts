/**
 * File uploaded via FormData to the backend.
 *
 * @memberof adminbro
 */
export type UploadedFile = {
  size: number;
  path: string;
  type: string;
  name: string;
}
