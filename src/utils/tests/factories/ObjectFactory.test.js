import { MockFactory } from './MockFactory';
import { ObjectFactory } from './ObjectFactory';
import { MustBeObjectFactoryError } from './errors';

class TestPassValueFactory extends MockFactory {
  constructor(value) {
    super();
    this.value = value;
  }

  create() {
    return this.value;
  }
}

describe('ObjectFactory', () => {
  test('Create without mixin', () => {
    const testFactoryValue = 'test';
    const factory = new ObjectFactory({
      id: 1,
      test: new TestPassValueFactory(testFactoryValue),
    });

    expect(factory.create()).toEqual({ id: 1, test: testFactoryValue });
  });

  describe('Mixins', () => {
    const template = {
      id: 1,
      test: new TestPassValueFactory('old'),
    };

    const mixin = {
      test: new TestPassValueFactory('new'),
      name: 'hello',
    };

    const expectedResult = {
      id: template.id,
      test: mixin.test.value,
      name: mixin.name,
    };

    test('Create with mixin', () => {
      const factory = new ObjectFactory(template);

      expect(factory.create(mixin)).toEqual(expectedResult);
    });

    test('Create with factory mixin', () => {
      const factory = new ObjectFactory(template);

      const mixinFactory = new ObjectFactory(mixin);

      expect(factory.create(mixinFactory)).toEqual(expectedResult);
    });

    test('Extend', () => {
      const factory = new ObjectFactory(template);

      const mixinFactory = new ObjectFactory(mixin);

      const extendedFactory = factory.extend(mixinFactory);

      expect(extendedFactory).toEqual(expectedResult);
    });

    test('Extend from non factory', () => {
      const factory = new ObjectFactory(template);
      expect.assertions(1);

      try {
        factory.extend(mixin);
      } catch (error) {
        expect(error).toBeInstanceOf(MustBeObjectFactoryError);
      }
    });
  });
});
