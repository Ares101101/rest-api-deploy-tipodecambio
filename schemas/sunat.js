import z from 'zod'// require installed
const sunatSchema = z.object({
  grant_type: z.string({
    invalid_type_error: 'client_credentials must be string',
    required_error: 'client_credentials is required'
  }),
  scope: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  client_id: z.string(),
  client_secret: z.string()
})
export function validateSunat (input) {
  return sunatSchema.safeParse(input)
}
export function validatePartialSunat (input) {
  return sunatSchema.partial().safeParse(input)
}
