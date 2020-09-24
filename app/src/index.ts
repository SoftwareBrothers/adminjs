
import AdminBro from 'admin-bro'
import AdminBroSequelize from '@admin-bro/sequelize'
import { UserResource } from './admin/resources/user/user-resource'

import { connect, models } from './databases/sequelize'
import { listen } from './plugins/express'
import { options } from './admin/options'

AdminBro.registerAdapter(AdminBroSequelize)

const run = async (): Promise<void> => {
  await connect()

  const admin = new AdminBro({
    ...options,
    resources: [{
      options: UserResource,
      resource: models.User,
    }],
  })

  listen(admin)
}

run()
