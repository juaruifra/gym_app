import { RolUsuario } from '../common/enums/rol.enum';

const usuarioData = [
  {
    // Usuario administrador para pruebas iniciales.
    id: 1,
    nombre: 'Admin',
    apellidos: 'Gym App',
    email: 'admin@gymapp.com',
    password: 'Admin123*',
    telefono: '+34600000001',
    rol: RolUsuario.ADMIN,
  },
  {
    // Clientes de ejemplo para simular reservas reales.
    id: 2,
    nombre: 'Juan',
    apellidos: 'Ruiz Perez',
    email: 'juan@email.com',
    password: 'Cliente123*',
    telefono: '+34600000002',
    rol: RolUsuario.CLIENTE,
  },
  {
    id: 3,
    nombre: 'Maria',
    apellidos: 'Lopez Gomez',
    email: 'maria@email.com',
    password: 'Cliente123*',
    telefono: '+34600000003',
    rol: RolUsuario.CLIENTE,
  },
];

export default usuarioData;
