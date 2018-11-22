// Modules
import moment from 'moment';

export default function getWeeksCount({ startDate, endDate, dateFormat = 'YYYY-MM-DD' }) {
  const start = moment(startDate, dateFormat);
  const end = moment(endDate, dateFormat);
  return start.diff(end, 'week');
}
