import { MockFactory } from './MockFactory';

export const randomIntFn = (min, max) => () => Math.floor(Math.random() * (max - min + 1)) + min;

export const resolveFactoryValue = (item) => (
  item instanceof MockFactory ? item.create() : item
);

export const createManyMocks = (length, factory) => (
  Array.from({ length }, () => factory.create())
);

export const getIterator = (iterable) => iterable[Symbol.iterator]();
