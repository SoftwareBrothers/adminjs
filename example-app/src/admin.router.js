const { default: AdminBro } = require('admin-bro')
const { buildAuthenticatedRouter } = require('admin-bro-expressjs')
const express = require('express')
const argon2 = require('argon2')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const { Company } = require('./companies/company.entity')

const { ADMIN_PASSWORD, ADMIN_EMAIL, ADMIN_COMPANY } = process.env

/**
 * @param {AdminBro} admin
 * @return {Promise<express.Router>} router
 */
const buildAdminRouter = async (admin) => {
  if (!await Company.countDocuments()) {
    await Company.create({
      companyName: ADMIN_COMPANY,
      email: ADMIN_EMAIL,
      encryptedPassword: await argon2.hash(ADMIN_PASSWORD),
    })
  }
  const router = buildAuthenticatedRouter(admin, {
    cookieName: process.env.COOKIE_NAME,
    cookiePassword: process.env.COOKIE_PASSWORD,
    authenticate: async (email, password) => {
      const company = await Company.findOne({ email })

      if (company && await argon2.verify(company.encryptedPassword, password)) {
        return company.toJSON()
      }
      return null
    },
  }, null, {
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
  admin.watch()
  return router
}

module.exports = buildAdminRouter
