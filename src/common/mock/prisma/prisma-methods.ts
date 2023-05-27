export class PrismaMethods<Elements> {
  constructor(private readonly elements: Elements[] = []) {}

  findMany() {
    return this.elements;
  }

  findFirst() {
    return this.elements[0];
  }

  deleteMany() {
    return this.elements;
  }

  create() {
    return this.elements;
  }

  count() {
    return this.elements.length;
  }
}
