export default function calculateAge(birthday) {
  const bDay = new Date(birthday);
  let ageDifMs = Date.now() - bDay.getTime();
  let ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
