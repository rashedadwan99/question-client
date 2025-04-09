export function checkRequiredFields(fields, data) {
  const requiredFieldsKeys = fields
    .filter((f) => f.required)
    .map((f) => f.name);
  const requiredData = requiredFieldsKeys.filter(
    (rf) => data[rf].length >= 1 || data[rf] >= 1
  );
  if (requiredData.length === requiredFieldsKeys.length) return true;

  return false;
}
export const regexValidation = (data, pattern, message) => {
  if (!data.match(pattern)) {
    return false;
  }
  return true;
};

export const conditionalValidation = (condition, message) => {
  if (!condition) {
    return false;
  }
  return true;
};
