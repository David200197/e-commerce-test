type Options = {
  page: number;
  perPage: number;
};

export class Paginator {
  private page: number;
  private perPage: number;
  constructor(private readonly options: Options) {
    Object.assign(this, options);
  }

  get skip() {
    return (this.page - 1) * this.perPage;
  }

  get limit() {
    return this.perPage;
  }

  get take() {
    return this.perPage;
  }

  getTotalPage(totalElement: number) {
    if (!this.perPage) return 1;
    return Math.ceil(totalElement / this.perPage);
  }
}
