export function normalizarCampo(campo) {
  if (campo === undefined || campo === null) return '';
  return String(campo)
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(/r\$\s?/g, '')
    .replace(/\./g, '')
    .replace(/,00$|\.00$|,0$|\.0$/g, '')
    .replace(/[\r\n]/g, '')
    .replace(/[^\wÀ-ÿ0-9]/g, '')
    .trim();
}
