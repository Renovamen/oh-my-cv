export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type PartialWithRequired<T, K extends keyof T> = Pick<T, K> & Partial<T>;

// https://stackoverflow.com/questions/55541275/typescript-check-for-the-any-type
// https://github.com/vueuse/vueuse/blob/main/packages/shared/utils/types.ts
export type IfAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export type IsAny<T> = IfAny<T, true, false>;

export type Callback<T> =
  IsAny<T> extends true
    ? (param: any) => void
    : [T] extends [void]
      ? () => void
      : (param: T) => void;
