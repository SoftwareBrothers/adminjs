import { ResourceOptions } from 'admin-bro'

export const UserResource: ResourceOptions = {
  listProperties: ['file', 'email'],
  navigation: {
    name: null,
    icon: 'User',
  },
  properties: {
    encryptedPassword: {
      isVisible: false,
    },
  },
}
