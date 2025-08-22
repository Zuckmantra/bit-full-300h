# Proyecto Backend - Bit Full 300H

Backend desarrollado con Node.js, Express.js y MongoDB para el proyecto final del diplomado.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gestión de variables de entorno

## 📁 Estructura del Proyecto

\`\`\`
bit-full-300h/
├── models/
│   ├── Usuario.js
│   ├── Publicacion.js
│   ├── Categoria.js
│   └── Comentario.js
├── routes/
│   └── usuarios.js
├── app.js
├── package.json
├── .env
├── .gitignore
└── README.md
\`\`\`

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio
\`\`\`bash
git clone https://github.com/tu-usuario/proyecto-backend-300h.git
cd proyecto-backend-300h
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno
Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:
\`\`\`env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/proyecto-diplomado
\`\`\`

### 4. Iniciar MongoDB
Asegúrate de tener MongoDB instalado y ejecutándose en tu sistema.

### 5. Iniciar el servidor
\`\`\`bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
\`\`\`

## 🌐 Endpoints Disponibles

### Servidor
- `GET /` - Información del servidor
- `GET /health` - Estado de salud del servidor

### Usuarios
- `GET /api/usuarios` - Obtener todos los usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID
- `POST /api/usuarios` - Crear nuevo usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario (soft delete)

## 📊 Modelos de Datos

### Usuario
- `nombre` (String, requerido)
- `correoElectronico` (String, requerido, único)
- `contraseña` (String, requerido)
- `rol` (String, enum: ['admin', 'usuario'])
- `fechaCreacion` (Date)
- `activo` (Boolean)

### Publicación
- `titulo` (String, requerido)
- `contenido` (String, requerido)
- `autor` (ObjectId, referencia a Usuario)
- `categoria` (ObjectId, referencia a Categoria)
- `estado` (String, enum: ['borrador', 'publicado', 'archivado'])
- `tags` (Array de Strings)

### Categoría
- `nombre` (String, requerido, único)
- `descripcion` (String)
- `color` (String, hexadecimal)
- `activa` (Boolean)

### Comentario
- `contenido` (String, requerido)
- `autor` (ObjectId, referencia a Usuario)
- `publicacion` (ObjectId, referencia a Publicacion)
- `aprobado` (Boolean)

## 🔧 Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon

## 📝 Notas de Desarrollo

- El servidor se ejecuta por defecto en el puerto 3000
- La conexión a MongoDB se establece automáticamente al iniciar
- Los modelos incluyen validaciones y middlewares para optimizar el rendimiento
- Se implementa soft delete para los usuarios (campo `activo`)

## 👨‍💻 Autor

**Maximiliano** - Estudiante del Diplomado Full Stack

---

¡Gracias por revisar este proyecto! 🚀
