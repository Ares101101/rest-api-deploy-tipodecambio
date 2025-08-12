import fs from 'fs'

const data = JSON.parse(fs.readFileSync('./tipodecambio.json', 'utf-8'))

data.forEach(item => {
  const { fecPublica = '', valTipo = '', codTipo = '' } = item
  // Escapa comillas simples para SQL
  const f = fecPublica.replace(/'/g, "''")
  const v = valTipo.replace(/'/g, "''")
  const c = codTipo.replace(/'/g, "''")
  console.log(`INSERT INTO tipodecambio (fecPublica, valTipo, codTipo) VALUES ('${f}', '${v}', '${c}');`)
})
