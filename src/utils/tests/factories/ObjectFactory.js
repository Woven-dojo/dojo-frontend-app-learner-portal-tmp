import { MockFactory } from './MockFactory';

export class ObjectFactory extends MockFactory {
  constructor(template) {
    super();
    this.template = template;
  }

  create(mixin) {
    const result = {};

    Object.entries(this.template).forEach(([key, item]) => {
      if (item instanceof MockFactory) {
        result[key] = item.create();
        return;
      }

      result[key] = item;
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
