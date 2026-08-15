import assert from 'node:assert/strict';
import test from 'node:test';

import { getMarqueeAnimationDuration } from '../src/sections/intakeRibbonSpeed.ts';

test('uses the configured banner duration', () => {
  assert.equal(getMarqueeAnimationDuration(48), '48s');
});

test('falls back to 35 seconds when no speed is configured', () => {
  assert.equal(getMarqueeAnimationDuration(undefined), '35s');
});

test('keeps malformed CMS values within the supported range', () => {
  assert.equal(getMarqueeAnimationDuration(4), '10s');
  assert.equal(getMarqueeAnimationDuration(200), '120s');
  assert.equal(getMarqueeAnimationDuration(Number.NaN), '35s');
});
