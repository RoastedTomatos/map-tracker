import express from 'express'
import cors from 'cors'
import { objectsStore } from './store/objectsStore.js'
import { startWorld } from './simulation/world.js'
import { auth, login } from './simulation/auth.js'

const app = express()
app.use(
  cors({
    origin: 'https://map-tracker-eta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
)
app.use(express.json())

app.get('/health', (_, res) => res.send('ok'))

app.post('/login', login)

app.get('/objects', auth, (_, res) => {
  res.json(objectsStore.getAll())
})

startWorld()

app.listen(4000, () => {
  console.log('Backend running on :4000')
})
