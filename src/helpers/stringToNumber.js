export default function stringToNumber(str, radix = 10) {
  const regExp = /\D/g;
  let result = 0;
  if (typeof str === 'string') {
    result = str.replace(regExp,'')
  }
  return parseInt(result, radix);
}
