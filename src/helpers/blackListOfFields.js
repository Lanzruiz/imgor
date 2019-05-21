const blackListForSports = { fashion: ['position'] };

export const shouldRenderField = (sportName = '', filedName = '') => {
  const sport = String(sportName).toLowerCase();
  const field = String(filedName).toLowerCase();
  
  const blacklist = blackListForSports[sport];
  
  if(!blacklist) return true;
  
  return !blacklist.find(v => v === field);
};


export const validationWithBlacklist = (condition, sportName = '', filedName = '') => {
  const sport = String(sportName).toLowerCase();
  const field = String(filedName).toLowerCase();
  
  const blacklist = blackListForSports[sport];
  
  if(!blacklist) return condition;
  
  return blacklist.find(v => v === field) ? false : condition;
};
