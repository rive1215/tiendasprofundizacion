Este es un proyecto de API REST para la gestión de tiendas, clientes, productos y compras. Está construido con Node.js, Express y Sequelize para interactuar con la base de datos.
También se utiliza la librería JOI para validar los datos de entrada

Requisitos Previos:

Antes de intentar ejecutar, aseguresé de tener instalado:
-Node.js
-Mysql

Instalación:

Clona el repositorio:
git clone https://github.com/tu-repo.git

Ingresa al directorio del proyecto:
cd tiendas

Instala las dependencias:
npm install

Configura las variables de entorno:
Copia el archivo .env.example y renómbralo como .env
Configura los valores de conexión a la base de datos en el archivo .env

Configuración de la base de datos

Ejecuta la sincronización de modelos con Sequelize:
node src/baseDatos/index.js
Esto creará las tablas en la base de datos según los modelos definidos.

Ejecución del servidor

Para iniciar el servidor en modo desarrollo:
npm run dev
Para ejecutar en producción:
npm start
El servidor correrá en http://localhost:3001 en este caso pero se puede configurar desde los archivos .env y app.js


Endpoints disponibles

Tiendas

Registrar tienda: POST /api/tienda/registrar
Listar todas las tiendas: GET /api/tienda/listar
Obtener tienda por ID: GET /api/tienda/:id
Actualizar tienda: PUT /api/tienda/actualizar/:id
Eliminar tienda: DELETE /api/tienda/eliminar/:id

Productos

Registrar producto: POST /api/producto/registrar
Listar productos: GET /api/producto/listar
Obtener producto por ID: GET /api/producto/:id
Actualizar producto: PUT /api/producto/actualizar/:id
Eliminar producto: DELETE /api/producto/eliminar/:id

Clientes

Registrar cliente: POST /api/cliente/registrar
Listar clientes: GET /api/cliente/listar
Obtener cliente por cédula: GET /api/cliente/:cedula
Actualizar cliente: PUT /api/cliente/actualizar/:cedula
Eliminar cliente: DELETE /api/cliente/eliminar/:cedula


Compras

Registrar compra: POST /api/compra/registrar
Listar compras: GET /api/compra/listar
Obtener compra por ID: GET /api/compra/:id
Actualizar compra: PUT /api/compra/actualizar/:id
Eliminar compra: DELETE /api/compra/eliminar/:id

Clientes por tienda

Registrar cliente en una tienda: POST /api/clientextienda/registrar
Listar tiendas de un cliente: GET /api/clientextienda/:cedula

⚙️ Tecnologías utilizadas

Node.js

Express.js

Sequelize (ORM)

MySQL

📄 Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.

