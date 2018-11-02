export default function({ arrayCount = 1, array = [] }) {
  const result = {};
  const defaultCounterValue = 1;
  let counter = defaultCounterValue;
  for (let i = defaultCounterValue; i <= arrayCount; i++) {
    result[`array_${i}`] = [];
  }
  array.forEach(function(item, idx) {
    result[`array_${counter}`].push(item);
    counter++;
    if ((idx + 1) % arrayCount === 0) {
      counter = defaultCounterValue;
    }
  });
  return result;
}
