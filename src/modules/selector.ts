import { Ugen } from '../gen';

export function selector(
  control: number | Ugen,
  ...inputs: (number | Ugen)[]
): Ugen {
  return ({ code, join }) => {
    return code.memoize`[${join(',', ...inputs)}][${control}]`;
  }
}
