import { IndexFactory } from './IndexFactory';
import { createManyMocks } from './utils';

describe('IndexFactory', () => {
  test('Simple indexes', () => {
    const factory = new IndexFactory();

    const results = createManyMocks(3, factory);

    expect(results).toEqual([0, 1, 2]);
  });

  test('Value derived from index', () => {
    const factory = new IndexFactory((i) => `n${i}`);

    const results = createManyMocks(3, factory);

    expect(results).toEqual(['n0', 'n1', 'n2']);
  });
})
