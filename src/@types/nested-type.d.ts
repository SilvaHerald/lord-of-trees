type LeafValue = string | number | boolean | null | undefined | ((...args: any[]) => any);

type Join<K extends string, P extends string> = `${K}.${P}`;

type NestedKeyOf<T> = {
  [K in keyof T & string]: T[K] extends LeafValue
    ? K
    : T[K] extends any[] // treat arrays as leafs for safety
      ? K
      : K | Join<K, NestedKeyOf<T[K]>>;
}[keyof T & string];
