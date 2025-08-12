import { readJSON } from '../../utils.js'

const tipoDeCambio = readJSON('./tipodecambio.json')

export class TipoDeCambioModel {
  static async getAll ({ fecha }) {
    if (fecha) {
      return tipoDeCambio.filter(
        item => item.fecPublica === fecha
      )
    }
    return tipoDeCambio
  }

  static async getByFechaYCodTipo ({ fecha, codTipo }) {
    return tipoDeCambio.find(
      item => item.fecPublica === fecha && item.codTipo === codTipo
    )
  }

  static async create ({ input }) {
    tipoDeCambio.push(input)
    return input
  }

  static async delete ({ fecha, codTipo }) {
    const index = tipoDeCambio.findIndex(
      item => item.fecPublica === fecha && item.codTipo === codTipo
    )
    if (index === -1) return false
    tipoDeCambio.splice(index, 1)
    return true
  }

  static async update ({ fecha, codTipo, input }) {
    const index = tipoDeCambio.findIndex(
      item => item.fecPublica === fecha && item.codTipo === codTipo
    )
    if (index === -1) return false
    tipoDeCambio[index] = {
      ...tipoDeCambio[index],
      ...input
    }
    return tipoDeCambio[index]
  }
}
