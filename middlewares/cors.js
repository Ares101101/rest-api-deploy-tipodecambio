import cors from 'cors'

const ACCEPTED_ORIGINS = [
  '*'
]

export const corsmiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
  origin: (origin, callback) => {
    if (acceptedOrigins.includes(origin)) {
      return callback(null, true)
    }
    if (!origin) {
      return callback(null, false)
    }
    return callback(new Error('Invalid origin'))
  }
})
