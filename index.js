import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import cafeRoutes from './routes/cafes.js'
import menuRoutes from './routes/menus.js'
import itemRoutes from './routes/items.js'
import { register } from './controllers/auth.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

/* routes */
app.post('/auth/register', register)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/cafes', cafeRoutes)
app.use('/cafes/:cafeId/menus', menuRoutes)
app.use('/menus/:menuId/items/', itemRoutes)

/* Connect to Database */
const PORT = process.env.PORT || 6001
mongoose.connect(process.env.MONGO_URL, {
    dbName: 'test'
})
.then(() => app.listen(PORT, () => console.log(`Server listening on ${PORT}`)))
.catch((error) => console.log(`${error} did not connect`))