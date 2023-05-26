type Arguments<TypeArray> = {
  firstArray: TypeArray[];
  secondArray: TypeArray[];
};

export class SetOperation<TypeArray> {
  private firstSet: Set<TypeArray>;
  private secondSet: Set<TypeArray>;

  constructor({ firstArray, secondArray }: Arguments<TypeArray>) {
    this.firstSet = new Set(firstArray);
    this.secondSet = new Set(secondArray);
  }

  union() {
    const sets = new Set([...this.firstSet, ...this.secondSet]);
    return [...sets];
  }

  intersection() {
    const intersections = [...this.firstSet].filter((element) =>
      this.secondSet.has(element),
    );
    return intersections;
  }

  hasIntersection() {
    const intersections = this.intersection();
    return !!intersections.length;
  }

  difference() {
    const differences = [...this.firstSet].filter(
      (element) => !this.secondSet.has(element),
    );
    return differences;
  }

  hasDifference() {
    const differences = this.difference();
    return !!differences.length;
  }

  exclusion() {
    const inversalOperationSet = new SetOperation({
      firstArray: [...this.secondSet],
      secondArray: [...this.firstSet],
    });
    const firstOnlyElements = this.difference();
    const secondOnlyElements = inversalOperationSet.difference();
    const sets = new Set([...firstOnlyElements, ...secondOnlyElements]);
    return [...sets];
  }

  hasExclusion() {
    const exclusions = this.exclusion();
    return !!exclusions.length;
  }
}
