import { IndexFactory } from './IndexFactory';
import { ListFactory } from './ListFactory';
import { ObjectFactory } from './ObjectFactory';
import { IteratorFactory } from './IteratorFactory';

export const factory = {
  index: (...args) => new IndexFactory(...args),
  list: (...args) => new ListFactory(...args),
  object: (...args) => new ObjectFactory(...args),
  iterate: (...args) => new IteratorFactory(...args),
};
