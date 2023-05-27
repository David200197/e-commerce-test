import { Paginator } from './paginator.lib';

describe('Paginator', () => {
  describe('skip', () => {
    it('Should be return 0', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 1,
      });
      expect(paginator.skip).toEqual(0);
    });
    it('Should be return 10', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 2,
      });
      expect(paginator.skip).toEqual(10);
    });
    it('Should be return 20', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 3,
      });
      expect(paginator.skip).toEqual(20);
    });
  });
  describe('limit and take', () => {
    it('Should be return 10', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 1,
      });
      expect(paginator.take).toEqual(10);
    });
    it('Should be return 20', () => {
      const paginator = new Paginator({
        perPage: 20,
        page: 1,
      });
      expect(paginator.take).toEqual(20);
    });
    it('Should be return 30', () => {
      const paginator = new Paginator({
        perPage: 30,
        page: 1,
      });
      expect(paginator.take).toEqual(30);
    });
  });
  describe('getTotalPage', () => {
    it('Should be return 1', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 1,
      });
      expect(paginator.getTotalPage(6)).toEqual(1);
    });
    it('Should be return 2', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 1,
      });
      expect(paginator.getTotalPage(15)).toEqual(2);
    });
    it('Should be return 3', () => {
      const paginator = new Paginator({
        perPage: 10,
        page: 1,
      });
      expect(paginator.getTotalPage(24)).toEqual(3);
    });
  });
});
