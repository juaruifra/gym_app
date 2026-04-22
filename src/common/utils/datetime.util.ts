export function toSpainDateTime(value: Date | string): string {
  const date = value instanceof Date ? value : new Date(value);

  // Formateamos en zona de Madrid para mostrar siempre la misma hora al cliente.
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  // Reordenamos piezas para devolver yyyy-mm-dd hh:mm:ss.
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));

  return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}`;
}
