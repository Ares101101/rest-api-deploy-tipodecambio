import { TipoDeCambioModel } from '../models/sql/models.js'
import { validateTipoDeCambio, validatePartialTipoDeCambio } from '../schemas/TipodeCambio.js'

export class routeController {
  static async getAll (req, res) {
    const { fecha } = req.query
    const tiposDeCambio = await TipoDeCambioModel.getAll({ fecha })
    res.json(tiposDeCambio)
  }

  static async getByFechaYCodTipo (req, res) {
    const { fecha, codTipo } = req.query
    if (!fecha || !codTipo) {
      return res.status(400).json({ message: 'fecha y codTipo son requeridos' })
    }
    const tipoDeCambio = await TipoDeCambioModel.getByFechaYCodTipo({ fecha, codTipo })
    if (tipoDeCambio) return res.json(tipoDeCambio)
    res.status(404).json({ message: 'Tipo de cambio no encontrado' })
  }

  static async create (req, res) {
    const result = validateTipoDeCambio(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const nuevoTipoDeCambio = await TipoDeCambioModel.create({ input: result.data })
    res.status(201).json(nuevoTipoDeCambio)
  }

  static async delete (req, res) {
    const { fecha, codTipo } = req.query
    if (!fecha || !codTipo) {
      return res.status(400).json({ message: 'fecha y codTipo son requeridos' })
    }
    const result = await TipoDeCambioModel.delete({ fecha, codTipo })
    if (result === false) {
      return res.status(404).json({ message: 'Tipo de cambio no encontrado' })
    }
    return res.json({ message: 'Tipo de cambio eliminado' })
  }

  static async update (req, res) {
    const result = validatePartialTipoDeCambio(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { fecha, codTipo } = req.query
    if (!fecha || !codTipo) {
      return res.status(400).json({ message: 'fecha y codTipo son requeridos' })
    }
    const updatedTipoDeCambio = await TipoDeCambioModel.update({ fecha, codTipo, input: result.data })
    if (!updatedTipoDeCambio) {
      return res.status(404).json({ message: 'Tipo de cambio no encontrado' })
    }
    return res.json(updatedTipoDeCambio)
  }
}
