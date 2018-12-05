// Modules
import moment from 'moment';

export default function({ date, dateFormat, resultFormat }) {
  return moment(date, dateFormat).format(resultFormat);
}
