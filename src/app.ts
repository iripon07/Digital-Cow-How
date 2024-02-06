import cors from 'cors'
import express, { Application } from 'express'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './app/routes'
// import ApoError from './error/ApiError'

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1/', routes)

// app.get('/', (req: Request, res: Response, next:NextFunction) => {
//   // res.send('Working successfully !')
//   throw new ApoError(400, `Ore baba`)
//   // next(`Ore baba Error`)
// })

app.use(globalErrorHandler)

export default app
