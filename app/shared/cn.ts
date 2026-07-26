import { twMerge } from "tailwind-merge";

/**
 * Same as `ClassNameValue` from `tailwind-merge`, but without support for
 * arrays (to keep arguments simple)
 */
export type ClassNameValue = string | null | undefined | 0 | false;

/**
 * @example `cn('foo', condition && 'bar', condition && 'baz')`
 */
export function cn(...inputs: ClassNameValue[]): string {
  return twMerge(inputs);
}
