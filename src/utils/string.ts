export function replace(s: string, map: Object) {
  if (!map) {
    return s;
  }

  let result = s;
  for (const [key, value] of Object.entries(map)) {
    result = result.replace(new RegExp(":" + key, "g"), value);
  }

  return result;
}