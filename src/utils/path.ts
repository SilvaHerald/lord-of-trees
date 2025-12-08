export function mergePath(path_1: string, path_2: string) {
  return path_1.replace(/\/+$/, '') + '/' + path_2.replace(/^\/+/, '') || '/';
}
