import express from 'express'
import { boardRoute } from '~/routes/v1/boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'OK' })
})

Router.use('/boards', boardRoute)

export const APIs_V1 = Router