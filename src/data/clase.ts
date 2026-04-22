import { EstadoClase } from '../common/enums/estado-clase.enum';

const claseData = [
  {
    id: 1,
    nombre: 'Spinning Avanzado',
    descripcion: 'Clase intensa de ciclismo indoor',
    fecha: '2026-05-01',
    horaInicio: '18:00:00',
    horaFin: '18:45:00',
    aforoMaximo: 20,
    plazasDisponibles: 18,
    estado: EstadoClase.ACTIVA,
    entrenadorId: 1,
  },
  {
    id: 2,
    nombre: 'Yoga Flow',
    descripcion: 'Sesion de movilidad y respiracion',
    fecha: '2026-05-02',
    horaInicio: '19:00:00',
    horaFin: '20:00:00',
    aforoMaximo: 15,
    plazasDisponibles: 15,
    estado: EstadoClase.ACTIVA,
    entrenadorId: 2,
  },
  {
    id: 3,
    nombre: 'Pilates Core',
    descripcion: 'Trabajo de core y postura',
    fecha: '2026-05-03',
    horaInicio: '17:00:00',
    horaFin: '17:50:00',
    aforoMaximo: 12,
    plazasDisponibles: 12,
    estado: EstadoClase.ACTIVA,
    entrenadorId: 3,
  },
];

export default claseData;
