/**
 * Obtiene la fecha en formato YYYY-MM-DD usando la zona horaria local del usuario.
 * Evita el bug de toISOString() que usa UTC y puede mostrar el día siguiente.
 */
export const getLocalDateStr = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
