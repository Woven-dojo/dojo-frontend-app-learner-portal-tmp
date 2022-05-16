import { MockFactory } from './MockFactory';
import { ListFactory } from './ListFactory';
import { createManyMocks } from './utils';

class TestMockFactory extends MockFactory {
  static OUTPUT = 'factory_output';

  create() {
    return this.constructor.OUTPUT;
  }
}

describe('ListFactory', () => {
  const threeMocks = [
    TestMockFactory.OUTPUT,
    TestMockFactory.OUTPUT,
    TestMockFactory.OUTPUT,
  ];

  test('Three items', () => {
    const factory = new ListFactory(3, new TestMockFactory());

    expect(factory.create()).toEqual(threeMocks);
  });

  test('Empty', () => {
    const factory = new ListFactory(0, new TestMockFactory());

    expect(factory.create()).toEqual([]);
  });

  test('Dynamic length', () => {
    const lengths = [3, 0];
    let currentLengthIndex = 0;
    const getLength = () => {
      const result = lengths[currentLengthIndex];
      currentLengthIndex++;
      return result;
    };

    const factory = new ListFactory(getLength, new TestMockFactory());

    expect(createManyMocks(2, factory)).toEqual([
      threeMocks,
      [],
    ]);
  });
});
