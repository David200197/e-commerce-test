import { SetOperation } from './set-operation.lib';

describe('SetOperation', () => {
  describe('union', () => {
    it('Should be return [1, 2, 3, 4, 5]', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.union()).toEqual([1, 2, 3, 4, 5]);
    });
    it('Should be return ["A", "B", "C", "D", "E"]', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['D', 'E'],
      });
      expect(operation.union()).toEqual(['A', 'B', 'C', 'D', 'E']);
    });
  });
  describe('intersection', () => {
    it('Should be return [3]', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.intersection()).toEqual([3]);
    });
    it('Should be return []', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['D', 'E'],
      });
      expect(operation.intersection()).toEqual([]);
    });
  });
  describe('hasIntersection', () => {
    it('Should be return true', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.hasIntersection()).toEqual(true);
    });
    it('Should be return false', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['D', 'E'],
      });
      expect(operation.hasIntersection()).toEqual(false);
    });
  });
  describe('difference', () => {
    it('Should be return [1, 2]', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.difference()).toEqual([1, 2]);
    });
    it('Should be return []', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['A', 'B', 'C'],
      });
      expect(operation.difference()).toEqual([]);
    });
  });
  describe('hasDifference', () => {
    it('Should be return true', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.hasDifference()).toEqual(true);
    });
    it('Should be return false', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['A', 'B', 'C'],
      });
      expect(operation.hasDifference()).toEqual(false);
    });
  });
  describe('exclusion', () => {
    it('Should be return [1, 2, 4, 5]', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.exclusion()).toEqual([1, 2, 4, 5]);
    });
    it('Should be return []', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['A', 'B', 'C'],
      });
      expect(operation.exclusion()).toEqual([]);
    });
  });
  describe('hasExclusion', () => {
    it('Should be return true', () => {
      const operation = new SetOperation({
        firstArray: [1, 2, 3],
        secondArray: [3, 4, 5],
      });
      expect(operation.hasExclusion()).toEqual(true);
    });
    it('Should be return false', () => {
      const operation = new SetOperation({
        firstArray: ['A', 'B', 'C'],
        secondArray: ['A', 'B', 'C'],
      });
      expect(operation.hasExclusion()).toEqual(false);
    });
  });
});
