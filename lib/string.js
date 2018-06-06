export function replace(s, map) {
  if (!map) {
    return s;
  }

  let result = s;
  for (const [key, value] of Object.entries(map)) {
    result = result.replace(new RegExp(":" + key, "g"), value);
  }

  return result;
}

export function ucFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
