type Options = {
  page: number;
  perPage: number;
};

/**
 * The Paginator class is used to create objects that allow pagination of a set of elements.
 * Paginator objects can be configured with pagination options, such as the current page and
 * the number of elements per page.
 * @property page: The current page number. @type number
 * @property perPage: The number of elements per page. @type number
 * @constructor options: Creates a new Paginator object with the specified pagination options.
 * @method skip: Returns the number of elements to skip to show the current page.
 * @method limit: Returns the maximum number of elements to show per page.
 * @method take: Returns the maximum number of elements to take from the list of elements to show on the current page.
 * @method getTotalPage: Returns the total number of pages needed to show all available elements,
 * taking into account the number of elements per page specified in the options.
 */
export class Paginator {
  private page: number;
  private perPage: number;
  constructor(private readonly options: Options) {
    Object.assign(this, options);
  }

  /** Returns the number of elements to skip to show the current page. */
  get skip() {
    return (this.page - 1) * this.perPage;
  }

  /** Returns the number of elements to skip to show the current page. */
  get limit() {
    return this.perPage;
  }

  /** take: Returns the maximum number of elements to take from the list of elements to show on the current page. */
  get take() {
    return this.perPage;
  }

  /**Returns the total number of pages needed to show all available elements
   * @argument totalElement @type number
   */
  getTotalPage(totalElement: number) {
    if (!this.perPage) return 1;
    return Math.ceil(totalElement / this.perPage);
  }
}
