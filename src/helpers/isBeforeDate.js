// Modules
import moment from 'moment';

export default function({ startDate, endDate }) {
  return moment(startDate).isBefore(endDate);
}
