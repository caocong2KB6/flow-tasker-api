import Joi from 'joi'
import ApiError from '~/middlewares/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required(),
    color: Joi.string().required()
  })

  try {
    console.log(req.body)
    await correctCondition.validateAsync(req.body)

    next()

    res.status(200).json({ message: 'OK' })
  } catch (error) {
    const errorMsg = new Error(error).message
    const customError = new ApiError(400, errorMsg)
    next(customError)
  }
}

export const boardValidation = {
  createNew
}
