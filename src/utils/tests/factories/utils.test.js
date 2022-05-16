import { createManyMocks, getIterator, resolveFactoryValue } from './utils';
import { MockFactory } from './MockFactory';

class TestMockFactory extends MockFactory {
  static OUTPUT = 'factory_output';

  create() {
    return this.constructor.OUTPUT;
  }
}

describe('resolveFactoryValue', () => {
  test('Regular value', () => {
    const input = 'input';
    expect(resolveFactoryValue(input)).toBe(input);
  });

  test('Factory', () => {
    const factory = new TestMockFactory();
    expect(resolveFactoryValue(factory)).toBe(TestMockFactory.OUTPUT);
  });
});

describe('createManyMocks', () => {
  const factory = new TestMockFactory();

  test('Empty', () => {
    expect(createManyMocks(0, factory)).toEqual([]);
  });

  test('Three items', () => {
    expect(createManyMocks(3, factory)).toEqual([
      TestMockFactory.OUTPUT,
      TestMockFactory.OUTPUT,
      TestMockFactory.OUTPUT,
    ]);
  });
});

describe('getIterator', () => {
  test('From array', () => {
    const first = 1;
    const last = 2;
    const list = [first, last];

    const expectIteratorToWork = (iterator) => {
      expect(iterator.next()).toEqual({ value: first, done: false });
      expect(iterator.next()).toEqual({ value: last, done: false });
      expect(iterator.next()).toEqual({ done: true });
    };

    expectIteratorToWork(getIterator(list));
    expectIteratorToWork(getIterator(list));
  });
});
