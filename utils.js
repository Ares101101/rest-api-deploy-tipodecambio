import { createRequire } from 'node:module'
import { writeFile } from 'fs/promises'
const require = createRequire(import.meta.url)

export const readJSON = (path) => require(path)

export async function writeJSON (path, data) {
  await writeFile(path, JSON.stringify(data, null, 2), 'utf-8')
}
