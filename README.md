## Requisitos
- Git
- NodeJs
- Mysql
- pm2 (puedes instalarlo con el comando `npm i -g pm2`)


## Instalación
1. Clona el repositorio con `git clone https://github.com/Pad28/Chamanaica-server.git`.
2. Entra a la raíz del proyecto y ejecuta `npm i` para instalar las dependencias necesarias.
3. Ejecuta `npm run build` para compilar el proyecto.
4. Asegúrate de definir las variables de entorno especificadas y luego ejecuta `npx prisma migrate deploy` para realizar una migración de la base de datos.
5. Puedes ejecutar el script `npm run start` para iniciar el proyecto o utilizar herramientas como `pm2` para ejecutarlo como un proceso en segundo plano. Usa el comando `pm2 start ./dist/app.js --name ContApp` desde la carpeta raíz.

## Scripts
- `npx prisma migrate dev --name init`: Realiza la migración de la base de datos en modo desarrollo.
- `npx prisma migrate deploy`: Realiza la migración de la base de datos para producción.
- `npm run dev`: Ejecuta el servidor en modo desarrollo.
- `npm run build`: Compila el proyecto.
- `npm run start`: Inicia el proyecto.

## Variables de entorno
Asegúrate de definir las siguientes variables de entorno en tu archivo `.env`:
- `DATABASE_URL`: Cadena de conexión a la base de datos MySQL.
- `PORT`: Puerto de escucha del servidor.
- `JWT_SEED`: Cadena secreta para la firma de los JSON Web Tokens.
- `GMAIL_USER`: Dirección de Gmail para ContApp.
- `GMAIL_KEY`: Contraseña de aplicaciones de la cuenta Gmail de ContApp.
- `API_SERVICE`: URL donde está publicado el servidor de ContApp, especifica el puerto si es necesario.
- `USER_ADMIN`: Correo del usuario administrador que se creará una vez se instancie el proyecto.
- `PASSWORD_ADMIN`: Contraseña del usuario administrador.
