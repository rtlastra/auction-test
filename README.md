# Configuración Inicial
## Backend
Ingrese a la carpeta server y ejecute los siguientes comandos:
```
  bundle install
  rails db:create && rails db:migrate && rails db:seed
```

## Frontend
Entrar a la carpeta client/auction-test y ejecutar los siguientes comandos:
```
  npm install
```
Crear el archivo .env con las siguientes variables de entorno:
```
  PORT=8001
  REACT_APP_API_HOSTNAME=http://localhost
  REACT_APP_API_PORT=3000
```
El servidor de rails se estará ejecutando en el puerto 3000 por defecto

# Iniciar el server
## Backend
En la carpeta server ejecutar los siguientes comandos:
```
  rails s
  rake jobs:work
```

## Frontend
En la carpeta client/auction-test ejecutar el siguiente comando:
```
  npm start
```
