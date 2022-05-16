import { MockFactory } from './MockFactory';
import { resolveFactoryValue } from './utils';
import { MustBeObjectFactoryError } from './errors';

export class ObjectFactory extends MockFactory {
  constructor(template) {
    super();
    this.template = template;
  }

  create(mixin) {
    const result = {};

    const resolveTemplate = (template) => (
      Object.entries(template).forEach(([key, item]) => {
        result[key] = resolveFactoryValue(item);
      })
    );

    resolveTemplate(this.template);

    if (mixin) {
      const usedMixin = mixin instanceof ObjectFactory
        ? mixin.create()
        : mixin;

      resolveTemplate(usedMixin);
    }

    return result;
  }

  extend(mixin) {
    if (!(mixin instanceof ObjectFactory)) {
      throw new MustBeObjectFactoryError();
    }
    return new this.constructor({ ...this.template, ...mixin });
  }
}
