import { createClient } from '@libsql/client'
import dotenv from 'dotenv'

dotenv.config()

const client = createClient({
  url: process.env.DB_URL,
  authToken: process.env.DB_TOKEN
})

export class TipoDeCambioModel {
  static async getAll ({ fecha }) {
    if (fecha) {
      const result = await client.execute({
        sql: 'SELECT * FROM tipodecambio WHERE fecPublica = ?',
        args: [fecha]
      })
      return result.rows
    }
    const result = await client.execute('SELECT * FROM tipodecambio')
    return result.rows
  }

  static async getByFechaYCodTipo ({ fecha, codTipo }) {
    const result = await client.execute({
      sql: 'SELECT * FROM tipodecambio WHERE fecPublica = ? AND codTipo = ?',
      args: [fecha, codTipo]
    })
    return result.rows[0] || null
  }

  static async create ({ input }) {
    const { fecPublica, valTipo, codTipo } = input
    await client.execute({
      sql: 'INSERT INTO tipodecambio (fecPublica, valTipo, codTipo) VALUES (?, ?, ?)',
      args: [fecPublica, valTipo, codTipo]
    })
    return input
  }

  static async delete ({ fecha, codTipo }) {
    const result = await client.execute({
      sql: 'DELETE FROM tipodecambio WHERE fecPublica = ? AND codTipo = ?',
      args: [fecha, codTipo]
    })
    return result.rowsAffected > 0
  }

  static async update ({ fecha, codTipo, input }) {
    // Solo permite actualizar valTipo
    if (!input.valTipo) return false
    const result = await client.execute({
      sql: 'UPDATE tipodecambio SET valTipo = ? WHERE fecPublica = ? AND codTipo = ?',
      args: [input.valTipo, fecha, codTipo]
    })
    if (result.rowsAffected > 0) {
      return { fecPublica: fecha, codTipo, valTipo: input.valTipo }
    }
    return false
  }
}
