import { MockFactory } from './MockFactory';

export class ListFactory extends MockFactory {
  constructor(length, itemFactory) {
    super();

    this.getLength = typeof length === 'function'
      ? length
      : () => length;

    this.itemFactory = itemFactory;
  }

  create() {
    return Array.from({ length: this.getLength() }, () => this.itemFactory.create());
  }
}
