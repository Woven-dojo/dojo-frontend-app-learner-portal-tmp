import { MockFactory } from './MockFactory';
import { resolveFactoryValue } from './utils';

export class ObjectFactory extends MockFactory {
  constructor(template) {
    super();
    this.template = template;
  }

  create(mixin) {
    const result = {};

    Object.entries(this.template).forEach(([key, item]) => {
      result[key] = resolveFactoryValue(item);
    });

    const usedMixin = mixin instanceof ObjectFactory
      ? mixin.create()
      : mixin;

    return { ...result, ...usedMixin };
  }

  extend(mixin) {
    return new this.constructor({ ...this.template, ...mixin });
  }
}
