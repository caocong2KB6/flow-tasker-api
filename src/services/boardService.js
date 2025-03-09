/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import slugify from '~/utils/formatter'

const createNew = async reqBody => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.name)
    }

    const createdBoard = await boardModel.createNew(newBoard)

    const getCreatedBoard = await boardModel.findOneById(createdBoard.insertedId)
    return getCreatedBoard

  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
