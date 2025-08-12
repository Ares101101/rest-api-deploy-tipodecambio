import z from 'zod'

const tipoDeCambioSchema = z.object({
  fecPublica: z.string({
    required_error: 'fecPublica es requerido',
    invalid_type_error: 'fecPublica debe ser string'
  }),
  valTipo: z.string({
    required_error: 'valTipo es requerido',
    invalid_type_error: 'valTipo debe ser string'
  }),
  codTipo: z.enum(['C', 'V'], {
    required_error: 'codTipo es requerido',
    invalid_type_error: 'codTipo debe ser "C" o "V"'
  })
})

export function validateTipoDeCambio (input) {
  return tipoDeCambioSchema.safeParse(input)
}

export function validatePartialTipoDeCambio (input) {
  return tipoDeCambioSchema.partial().safeParse(input)
}
