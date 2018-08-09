export function replace(s: string, map: Object, prefix: string = "") {
  if (!map) {
    return s;
  }

  let result = s;
  for (const [key, value] of Object.entries(map)) {
    result = result.replace(new RegExp(prefix + key, "g"), value);
  }

  return result;
}

export function placeholder(s: string, map: Object) {
  return replace(s, map, ":");
}

export function ucFirst(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}