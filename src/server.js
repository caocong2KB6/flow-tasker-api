/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CLOSE_DB, CONNECT_DB, GET_DB } from './config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  //Enable req.body json data
  app.use(express.json())

  //Use API V1
  app.use('/v1', APIs_V1)

  const hostname = env.APP_HOST
  const port = env.APP_PORT

  // app.get('/', async (req, res) => {
  //   console.log(await GET_DB().listCollections().toArray())
  //   res.end()
  // })

  //Middleware xu ly loi
  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello Cong, I am running at ${hostname}:${port}-> http:/${hostname}:${port}/`)
  })

  exitHook(() => {
    console.log('Disconnecting from MongoDB')
    CLOSE_DB()
  })
}

CONNECT_DB()
  .then(() => console.log('Connected to MongoDB'))
  .then(START_SERVER)
  .catch(error => {
    console.error(error)
    process.exit(0)
  })

