export interface MediaInterface {
  id: string;
  key: string;
  filename: string;
  description?: string;
  mimetype?: string;
  size?: number;
  bucket?: string;
}
