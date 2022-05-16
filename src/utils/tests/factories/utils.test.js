import { createManyMocks, resolveFactoryValue } from './utils';
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
