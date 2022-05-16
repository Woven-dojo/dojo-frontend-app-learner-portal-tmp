import { MockFactory } from './MockFactory';
import { resolveFactoryValue } from './utils';
import { EmptyIteratorFactoryError } from './errors';

export class IteratorFactory extends MockFactory {
  constructor(iterable) {
    super();

    this.iterable = iterable;
    this.startIteration();
  }

  startIteration() {
    this.iterator = this.iterable[Symbol.iterator]();
  }

  create() {
    let iteration = this.iterator.next();

    if (iteration.done) {
      this.startIteration();
      iteration = this.iterator.next();

      if (iteration.done) {
        throw new EmptyIteratorFactoryError();
      }
    }

    return resolveFactoryValue(iteration.value);
  }
}
