import { Ugen } from './ugen';

export function delay(a: Ugen, size: number) {
  let _a;
  let _offset;
  return {
    tap: (delay: number): Ugen => {
      return gen => {
        if (!_offset || !_a) {
          _offset = gen.alloc(size);
          _a = gen.prepare(a);
          gen.every(1, `${gen._buffer}[${_offset} + ${gen._frame} % ${size}] = ${_a}`);
        }
        return delay > 0 ? gen.code`${gen._buffer}[${_offset} + (${gen._frame} - ${delay + 1}) % ${size}]` : _a;
      }
    }
  }
}
