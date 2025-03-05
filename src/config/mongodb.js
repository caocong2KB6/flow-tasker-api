import { env } from '~/config/environment'

import { MongoClient, ServerApiVersion } from 'mongodb'

const MONGODB_URI = env.MONGODB_URI

const DATABASE_NAME = env.DATABASE_NAME

//Khởi tạo 1 database instance
let flowTaskerDatabaseInstance = null

//Khởi tạo một client instance để kết nối tới MongoDB
const mongoClientInstance = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Conect to DB
export const CONNECT_DB = async () => {
  //Gọi kết nối tới MongoDB Atlas
  await mongoClientInstance.connect()
  flowTaskerDatabaseInstance = mongoClientInstance.db(DATABASE_NAME)
}


export const GET_DB = () => {
  if (!flowTaskerDatabaseInstance)
    throw new Error('Please call CONNECT_DB first')
  return flowTaskerDatabaseInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}
