# API REST Tipo de Cambio

Este proyecto es una API REST para gestionar tipos de cambio, usando archivos JSON como base de datos.

## Instalación

1. Clona el repositorio.
2. Instala dependencias:
   ```
   npm install
   ```
3. Inicia el servidor:
   ```
   npm start
   ```
   El servidor escuchará en [http://localhost:3000](http://localhost:3000).

---

## Endpoints y ejemplos de uso

### Obtener todos los tipos de cambio

```
GET http://localhost:3000/Tipodecambio
```

---

### Obtener tipo de cambio por fecha y codTipo

```
GET http://localhost:3000/Tipodecambio/by?fecha=01/06/2025&codTipo=C
```

---

### Crear un nuevo tipo de cambio

```
POST http://localhost:3000/Tipodecambio
Content-Type: application/json

{
  "fecPublica": "01/06/2025",
  "valTipo": "3.75",
  "codTipo": "C"
}
```

---

### Actualizar un tipo de cambio

```
PATCH http://localhost:3000/Tipodecambio?fecha=01/06/2025&codTipo=C
Content-Type: application/json

{
  "valTipo": "3.80"
}
```

---

### Eliminar un tipo de cambio

```
DELETE http://localhost:3000/Tipodecambio?fecha=01/06/2025&codTipo=C
```

---

## Notas

- El campo `fecPublica` debe tener formato `dd/mm/yyyy`.
- El campo `codTipo` debe ser `"C"` (compra) o `"V"` (venta).
- Los datos se almacenan en el archivo `tipodecambio.json` en la raíz del proyecto.