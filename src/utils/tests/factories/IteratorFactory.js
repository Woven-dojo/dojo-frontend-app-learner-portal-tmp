import { MockFactory } from './MockFactory';
import { getIterator, resolveFactoryValue } from './utils';
import { EmptyIteratorFactoryError } from './errors';

export class IteratorFactory extends MockFactory {
  constructor(iterable, restFactory) {
    super();

    this.iterable = iterable;
    this.iterator = getIterator(this.iterable);
    this.isFillingTheRest = false;
    this.restFactory = restFactory;
  }

  restartIterationAndGetFirst() {
    this.iterator = getIterator(this.iterable);
    const { done, value } = this.iterator.next();

    if (done) {
      throw new EmptyIteratorFactoryError();
    }

    return value;
  }

  create() {
    if (this.isFillingTheRest) {
      return this.restFactory.create();
    }

    const { done, value } = this.iterator.next();

    if (!done) {
      return resolveFactoryValue(value);
    }

    if (this.restFactory) {
      this.isFillingTheRest = true;
      return this.restFactory.create();
    }

    return resolveFactoryValue(this.restartIterationAndGetFirst());
  }
}
