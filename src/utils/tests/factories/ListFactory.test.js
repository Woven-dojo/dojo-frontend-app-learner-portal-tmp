import { MockFactory } from './MockFactory';
import { ListFactory } from './ListFactory';

class TestMockFactory extends MockFactory {
  static OUTPUT = 'factory_output';

  create() {
    return this.constructor.OUTPUT;
  }
}

describe('ListFactory', () => {
  test('Three items', () => {
    const factory = new ListFactory(3, new TestMockFactory());

    expect(factory.create()).toEqual([
      TestMockFactory.OUTPUT,
      TestMockFactory.OUTPUT,
      TestMockFactory.OUTPUT,
    ]);
  });

  test('Empty', () => {
    const factory = new ListFactory(0, new TestMockFactory());

    expect(factory.create()).toEqual([]);
  })
})
