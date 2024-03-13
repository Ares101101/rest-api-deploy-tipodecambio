import { readJSON } from '../../utils.js'

const movies = readJSON('./movies.json')

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      return movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }

    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = []
    const formData = new URLSearchParams()
    formData.append('grant_type ', 'client_credentials')
    formData.append('scope', 'https://api.sunat.gob.pe/v1/contribuyente/contribuyentes')
    formData.append('client_id ', input.client_id)
    formData.append('client_secret', input.client_secret)

    const requestOptions = {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }

    await fetch(`https://api-seguridad.sunat.gob.pe/v1/clientesextranet/${input.client_id}/oauth2/token/`, requestOptions)
      .then(response => newMovie.push(response))

    return newMovie[0]
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex === -1) return false

    movies[movieIndex] = {
      ...movies[movieIndex],
      ...input
    }

    return movies[movieIndex]
  }
}
