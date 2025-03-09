import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const Joi = require('joi')

const BOARD_COLLECTIION_NAME = 'boards'
const BOARD_COLLECTIION_SCHEMA = Joi.object({
  title: Joi.string().required().min(3).max(50).trim().strict(),
  slug: Joi.string().required(),
  description: Joi.string().required(),

  columnOrderIds: Joi.array()
    .items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
    .default([]),

  createdAt: Joi.date().timestamp('javascript').default(Date.now()),
  updatedAt: Joi.date().timestamp('javascript').default(null),
  _destroyed: Joi.boolean().default(false)
})

const createNew = async data => {
  try {
    return await GET_DB().collection(BOARD_COLLECTIION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async id => {
  try {
    return await GET_DB()
      .collection(BOARD_COLLECTIION_NAME)
      .findOne({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}

export const boardModel = {
  BOARD_COLLECTIION_NAME,
  BOARD_COLLECTIION_SCHEMA,
  createNew,
  findOneById
}
