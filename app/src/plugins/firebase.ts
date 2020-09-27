import * as functions from 'firebase-functions'

const config = functions.config()

process.env.ADMIN_EMAIL = config?.env?.admin_email || process.env.ADMIN_EMAIL
process.env.ADMIN_PASSWORD = config?.env?.admin_password || process.env.ADMIN_PASSWORD

process.env.COOKIE_PASSWORD = config?.env?.cookie_pass || process.env.COOKIE_PASSWORD

process.env.NODE_ENV = config?.env?.node_env || process.env.NODE_ENV
process.env.POSTGRES_USER = config?.env?.pg_user || process.env.POSTGRES_USER
process.env.POSTGRES_PASSWORD = config?.env?.pg_pass || process.env.POSTGRES_PASSWORD
process.env.POSTGRES_DATABASE = config?.env?.pg_db_name || process.env.POSTGRES_DATABASE
process.env.POSTGRES_HOST = config?.env?.pg_db_host || process.env.POSTGRES_HOST
process.env.ASSETS_CDN = config?.env?.assets_cdn || process.env.ASSETS_CDN
