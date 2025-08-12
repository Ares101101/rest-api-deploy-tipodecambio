import express, { json } from 'express'
import { routerRo } from './rutes/rute.js'
import { corsmiddleware } from './middlewares/cors.js'
const app = express()
app.use(json())

app.use(corsmiddleware())
app.disable('x-powered-by')// disable header express

app.use('/Tipodecambio', routerRo)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`server listening on por http://localhost:${PORT}`)
})

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

export default app
if (typeof module !== 'undefined') {
  module.exports = app
}
