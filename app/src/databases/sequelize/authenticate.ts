import { CurrentAdmin } from 'admin-bro'
import argon2 from 'argon2'
import { UserModel } from '../../admin/resources/user/entities/sequelize'

const { ADMIN_PASSWORD, ADMIN_EMAIL } = process.env

export const authenticate = async (email, password): Promise<CurrentAdmin | null> => {
  const user = await UserModel.findOne({
    where: { email },
  })

  if (user && await argon2.verify(user.encryptedPassword, password)) {
    return {
      ...user.toJSON(),
      title: 'User',
      avatarUrl: 'https://api.adorable.io/avatars/285/abott@adorable.png',
      email,
    }
  }
  return null
}

export const createAdmin = async (): Promise<void> => {
  const existingUser = await UserModel.findOne({
    where: { email: process.env.ADMIN_EMAIL },
  })

  if (!existingUser) {
    await UserModel.create({
      email: ADMIN_EMAIL as string,
      encryptedPassword: await argon2.hash(ADMIN_PASSWORD as string),
    })
  }
}
