import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import routes from './app/routes'

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

app.get('/', (req: Request, res: Response) => {
  res.send('Working successfully !')
})

export default app
