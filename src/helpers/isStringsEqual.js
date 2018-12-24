// Modules
import isEqual from 'lodash/isEqual';
import toLower from 'lodash/toLower';
import isString from 'lodash/isString';

export default function(str1, str2) {
  if (isString(str1) && isString(str2)) {
    return isEqual( toLower(str1), toLower(str2) );
  }
  return false;
}