import { Router } from 'express'
import { routeController } from '../controllers/controllers.js'

export const routerRo = Router()

routerRo.get('/', routeController.getAll)

routerRo.get('/by', routeController.getByFechaYCodTipo)

routerRo.post('/', routeController.create)

routerRo.delete('/', routeController.delete)

routerRo.patch('/', routeController.update)
