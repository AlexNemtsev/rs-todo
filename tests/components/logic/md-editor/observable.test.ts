import { beforeEach, describe, expect, test } from '@jest/globals';
import { Observable } from '../../../../src/test-collector';

let toBeIncreased = 0;
let toBeDecreased = 0;

class Testable {
  static increase(): void {
    toBeIncreased += 1;
  }

  static decrease(): void {
    toBeDecreased -= 1;
  }
}

beforeEach(() => {
  Observable.subscribe(Testable.increase);
  Observable.subscribe(Testable.decrease);
});

test('Size of Observable.listeners should be equal 2', () => {
  const size = Observable.listeners.size;

  expect(size).toBe(2);
});

test('Observable should call passed functions', () => {
  Observable.notify();

  expect(toBeIncreased).toBe(1);
  expect(toBeDecreased).toBe(-1);
});
