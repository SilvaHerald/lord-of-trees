export function secureRandomInt(min: number, max: number) {
  if (min > max) throw new Error('min must be <= max');

  const range = max - min + 1;
  const array = new Uint32Array(1);

  // Compute the largest multiple of `range` that fits in 32 bits.
  // Anything above this "limit" would introduce modulo bias.
  const maxUnbiased = Math.floor(0xffffffff / range) * range;

  while (true) {
    crypto.getRandomValues(array);
    if (array[0] <= maxUnbiased) {
      return min + (array[0] % range);
    }
  }
}
