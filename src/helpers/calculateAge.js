export default function calculateAge(birthday) {
  const bDay = new Date(birthday);
  var ageDifMs = Date.now() - bDay.getTime();
  var ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
