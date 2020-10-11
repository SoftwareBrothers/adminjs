export interface UserInterface {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  encryptedPassword: string;
}
