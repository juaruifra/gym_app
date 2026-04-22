import { EstadoReserva } from '../common/enums/estado-reserva.enum';

const reservaData = [
  {
    // Reservas iniciales para probar listados y relaciones.
    id: 1,
    estado: EstadoReserva.ACTIVA,
    usuarioId: 2,
    claseId: 1,
  },
  {
    id: 2,
    estado: EstadoReserva.ACTIVA,
    usuarioId: 3,
    claseId: 1,
  },
  {
    id: 3,
    estado: EstadoReserva.ACTIVA,
    usuarioId: 2,
    claseId: 2,
  },
];

export default reservaData;
