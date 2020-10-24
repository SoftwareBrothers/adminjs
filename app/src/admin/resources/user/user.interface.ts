export type ProfilePhoto = {
  bucketKey: string;
  bucket: string;
  mimeType: string;
  size: number;
}

export interface UserInterface {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  encryptedPassword: string;
  profilePhoto?: ProfilePhoto;
}
