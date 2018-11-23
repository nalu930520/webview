function pad(number) {
  if (number < 10) {
   return '0' + number;
  }
  return number;
}

export const toISOString = date => {
  if (!date) return
  return date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        'T' + pad(date.getUTCHours()) +
        ':' + pad(date.getUTCMinutes()) +
        ':00' +
        'Z'
}
