import path from 'path'
import fs from 'fs'

export const dotenv = (options) => {
  const jsonFile = (options && options.path) || '.env.json'

  const jsonString = fs.readFileSync(path.resolve(process.cwd(), jsonFile), {
    encoding: 'utf8',
  })

  try {
    const envConfig = JSON.parse(jsonString)

    for (const key in envConfig) {
      process.env[key] = envConfig[key] || process.env[key]
    }
  } catch (err) {
    console.error(err)
  }
}
