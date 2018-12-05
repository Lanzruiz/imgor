export default function createNumbersArray({ to, from }) {
  return Array.from(Array(to - from + 1).keys(), function(x) {
    return x + from;
  });
}
