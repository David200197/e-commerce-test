type Arguments<TypeArray> = {
  firstArray: TypeArray[];
  secondArray: TypeArray[];
};

/**This class provides operations for Sets
 * @property firstArray: The first array @type TypeArray[]
 * @property secondArray: The second array @type TypeArray[]
 * @constructor options: Creates a new SetOperation object with the specified set operation options.
 * @method union: Returns the union of the two sets.
 * @method intersection: Returns the intersection of the two sets.
 * @method hasIntersection: Checks if the two sets have any intersection.
 * @method difference: Returns the difference between the two sets.
 * @method hasDifference: Checks if the two sets have any difference.
 * @method exclusion: Returns the exclusion of the two sets.
 * @method hasExclusion: Checks if the two sets have any exclusion.
 */
export class SetOperation<TypeArray> {
  private firstSet: Set<TypeArray>;
  private secondSet: Set<TypeArray>;

  constructor({ firstArray, secondArray }: Arguments<TypeArray>) {
    this.firstSet = new Set(firstArray);
    this.secondSet = new Set(secondArray);
  }

  /** Returns the union of the two sets.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.union() // [1, 2, 3, 4, 5]
   */
  union() {
    const sets = new Set([...this.firstSet, ...this.secondSet]);
    return [...sets];
  }

  /**Returns the intersection of the two sets.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.intersection() // [3]
   *
   * const operation2 = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [4, 5, 6]
   * })
   * operation2.intersection() // []
   */
  intersection() {
    const intersections = [...this.firstSet].filter((element) =>
      this.secondSet.has(element),
    );
    return intersections;
  }

  /**Checks if the two sets have any intersection.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.hasIntersection() // true
   *
   * const operation2 = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [4, 5, 6]
   * })
   * operation2.hasIntersection() // false
   */
  hasIntersection() {
    const intersections = this.intersection();
    return !!intersections.length;
  }

  /**Returns the difference between the two sets.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.difference() // [1, 2]
   *
   * const operation2 = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [1, 2, 3]
   * })
   * operation2.difference() // []
   */
  difference() {
    const differences = [...this.firstSet].filter(
      (element) => !this.secondSet.has(element),
    );
    return differences;
  }

  /**Checks if the two sets have any difference.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.hasDifference() // true
   *
   * const operation2 = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [1, 2, 3]
   * })
   * operation2.hasDifference() // false
   */
  hasDifference() {
    const differences = this.difference();
    return !!differences.length;
  }

  /**Returns the exclusion of the two sets.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.exclusion() // [1, 2, 4, 5]
   *
   * const operation2 = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [1, 2, 3]
   * })
   * operation2.exclusion() // []
   */
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

  /**Checks if the two sets have any exclusion.
   * @example
   * const operation = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [3, 4, 5]
   * })
   * operation.hasExclusion() // true
   *
   * const operation2 = new SetOperation({
   *    firstArray: [1, 2, 3],
   *    secondArray: [1, 2, 3]
   * })
   * operation2.hasExclusion() // false
   */
  hasExclusion() {
    const exclusions = this.exclusion();
    return !!exclusions.length;
  }
}
