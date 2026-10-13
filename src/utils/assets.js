export function assetUrl(path, base = import.meta.env?.BASE_URL || '/') {
  return path?.startsWith('/') ? base + path.slice(1) : path;
}
