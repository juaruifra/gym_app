# Gym App — Backend API REST

Backend de gestión de gimnasio desarrollado con **NestJS** y **TypeORM**. Permite gestionar usuarios, entrenadores, clases y reservas a través de una API REST con autenticación JWT y control de acceso por roles.

---

## Tecnologías utilizadas

- **NestJS** — framework backend
- **TypeORM** — ORM para el mapeo de entidades
- **MariaDB** — base de datos relacional
- **Docker** — contenerización del entorno completo
- **Swagger** — documentación interactiva de la API
- **class-validator** — validaciones en DTOs
- **bcrypt** — cifrado de contraseñas
- **typeorm-extension** — seeders de datos iniciales
- **JWT** — autenticación mediante tokens

---

## Requisitos previos

- Archivo `.env` configurado en la raíz del proyecto (ver sección de configuración)
- Docker instalado según tu sistema operativo:

**Windows**
Instalar [Docker Desktop](https://www.docker.com/products/docker-desktop/). Incluye tanto el motor de Docker como Docker Compose, y tiene interfaz gráfica. Hay que tenerlo abierto antes de ejecutar cualquier comando.

**Linux**
No es necesario instalar Docker Desktop. Se instala directamente el motor de Docker (Docker Engine) y el plugin de Compose desde el repositorio oficial:

```bash
# Instalar Docker Engine
curl -fsSL https://get.docker.com | sh

# Añadir tu usuario al grupo docker para no necesitar sudo
sudo usermod -aG docker $USER
newgrp docker

# Instalar el plugin de Compose (si no viene incluido)
sudo apt install docker-compose-plugin
```

---

## Configuración del entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_HOST=database
DB_PORT=3306
DB_USER=gymuser
DB_PASSWORD=gympassword
DB_DATABASE=gymdb
DB_ROOT_PASSWORD=rootpassword
DB_TIMEZONE=Z
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=1d
NODE_ENV=development
WEB_SERVER_PORT=8000
PMA_SECRET=clave_para_phpmyadmin
```

---

## Arrancar el proyecto

El comando es el mismo en ambos sistemas operativos:

```bash
docker compose up -d
```

Esto levanta los tres contenedores: el backend en el puerto configurado en `WEB_SERVER_PORT`, MariaDB y phpMyAdmin. No hace falta instalar Node ni ninguna dependencia en la máquina local.

> **Windows**: asegúrate de que Docker Desktop está abierto antes de ejecutar el comando.  
> **Linux**: si acabas de añadir tu usuario al grupo `docker`, puede que necesites cerrar y volver a abrir el terminal.

---

## Cargar datos iniciales (seeders)

Una vez que los contenedores estén en marcha, ejecutar dentro del contenedor del backend:

```bash
docker exec -it gym_app npm run seed
```

Esto crea en la base de datos los usuarios, entrenadores, clases y reservas de ejemplo. Se puede ejecutar varias veces sin problema, no genera duplicados.

---

## Accesos

| Servicio | URL |
|---|---|
| API REST | http://localhost:8000 |
| Swagger (documentación) | http://localhost:8000/api/docs |
| phpMyAdmin | http://localhost:9090 |

> Swagger solo está disponible cuando `NODE_ENV=development` en el `.env`.

---

## Usuarios de prueba

Estos usuarios se crean al ejecutar los seeders:

| Email | Contraseña | Rol |
|---|---|---|
| admin@gymapp.com | Admin123* | ADMIN |
| juan@email.com | Cliente123* | CLIENTE |
| maria@email.com | Cliente123* | CLIENTE |

---

## Módulos y endpoints principales

### Auth
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | /auth/register | Público | Registro de nuevo usuario (rol CLIENTE) |
| POST | /auth/login | Público | Login, devuelve el token JWT |
| GET | /auth/me | JWT válido | Devuelve el perfil del usuario autenticado |

### Usuarios
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | /usuarios | ADMIN | Crear usuario |
| GET | /usuarios | ADMIN | Listar usuarios |
| GET | /usuarios/:id | ADMIN | Obtener usuario por ID |
| PATCH | /usuarios/:id | ADMIN | Actualizar usuario |
| DELETE | /usuarios/:id | ADMIN | Eliminar usuario |

### Entrenadores
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | /entrenadores | ADMIN | Crear entrenador |
| GET | /entrenadores | Público | Listar entrenadores |
| GET | /entrenadores/:id | Público | Obtener entrenador por ID |
| PATCH | /entrenadores/:id | ADMIN | Actualizar entrenador |
| DELETE | /entrenadores/:id | ADMIN | Eliminar entrenador |

### Clases
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | /clases | ADMIN | Crear clase |
| GET | /clases | Público | Listar clases |
| GET | /clases/:id | Público | Obtener clase por ID |
| PATCH | /clases/:id | ADMIN | Actualizar clase |
| DELETE | /clases/:id | ADMIN | Eliminar clase |

### Reservas
| Método | Endpoint | Acceso | Descripción |
|---|---|---|---|
| POST | /reservas | CLIENTE | Crear reserva (el usuario se toma del token) |
| GET | /reservas/mis-reservas | CLIENTE | Ver mis reservas |
| GET | /reservas | ADMIN | Listar todas las reservas |
| GET | /reservas/:id | ADMIN | Obtener reserva por ID |
| PATCH | /reservas/:id | ADMIN | Actualizar reserva |
| DELETE | /reservas/:id | CLIENTE / ADMIN | Cancelar reserva (el cliente solo puede cancelar la suya) |

---

## Seguridad

- Todos los endpoints están protegidos por defecto mediante `JwtAuthGuard`.
- Los endpoints públicos llevan el decorador `@Public()`.
- La autorización por roles se gestiona con `RolesGuard` y el decorador `@Roles()`.
- Las contraseñas se cifran con bcrypt antes de guardarse en la base de datos.
- El token JWT debe enviarse en la cabecera `Authorization` con el formato `Bearer <token>`.

---

## Estructura del proyecto

```
src/
├── auth/           # Login, registro, guards y decoradores de seguridad
├── usuario/        # Gestión de usuarios
├── entrenador/     # Gestión de entrenadores
├── clase/          # Gestión de clases
├── reserva/        # Gestión de reservas
├── common/         # Enums, filtros, middleware y utilidades compartidas
├── data/           # Datos de prueba para los seeders
└── db/             # Seeders organizados por entidad
```

---

## Autor

Juan Antonio Ruiz Francés — Proyecto Recuperación Acceso a Datos, 2.º DAM

