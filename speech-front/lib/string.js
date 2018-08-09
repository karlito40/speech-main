export function replace(s, map, prefix = '') {
  if (!map) {
    return s;
  }

  let result = s;
  for (const [key, value] of Object.entries(map)) {
    result = result.replace(new RegExp(prefix + key, "g"), value);
  }

  return result;
}

export function placeholder(s, map) {
  return replace(s, map, ":");
}

export function ucFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
