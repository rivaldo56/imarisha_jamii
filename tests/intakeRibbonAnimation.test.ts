import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const tailwindConfig = readFileSync(
  new URL('../tailwind.config.js', import.meta.url),
  'utf8',
);

test('marquee travels one of four identical copies per loop', () => {
  assert.match(tailwindConfig, /"0%": \{ transform: "translateX\(0\)" \}/);
  assert.match(tailwindConfig, /"100%": \{ transform: "translateX\(-25%\)" \}/);
});
