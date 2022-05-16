import { IteratorFactory } from './IteratorFactory';
import { createManyMocks } from './utils';
import { MockFactory } from './MockFactory';
import { EmptyIteratorFactoryError } from './errors';

class TestMockFactory extends MockFactory {
  static OUTPUT = 'factory_output';

  create() {
    return this.constructor.OUTPUT;
  }
}

describe('IteratorFactory', () => {
  test('Starting over if ran out of elements', () => {
    const iterable = [1, 2, 3];

    const factory = new IteratorFactory(iterable);

    const result = createManyMocks(iterable.length * 3, factory);

    expect(result).toEqual([
      ...iterable,
      ...iterable,
      ...iterable,
    ]);
  });

  test('Fill in the rest with factory', () => {
    const iterable = [1, 2, 3];

    const factory = new IteratorFactory(iterable, new TestMockFactory());

    const result = createManyMocks(iterable.length + 2, factory);

    expect(result).toEqual([
      ...iterable,
      TestMockFactory.OUTPUT,
      TestMockFactory.OUTPUT,
    ]);
  });

  test('Empty iterator error', () => {
    const factory = new IteratorFactory([]);
    expect.assertions(1);
    try {
      factory.create();
    } catch (error) {
      expect(error).toBeInstanceOf(EmptyIteratorFactoryError);
    }
  });

  test('Factory Resolution', () => {
    const plainObject = { id: 2 };

    const factory = new IteratorFactory([
      new TestMockFactory(),
      plainObject,
    ]);

    const result = createManyMocks(2, factory);

    expect(result).toEqual([TestMockFactory.OUTPUT, plainObject]);
  });
});
