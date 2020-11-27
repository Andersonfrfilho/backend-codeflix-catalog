interface IFakeFindAndCount {
  array: Array<any>;
  skip: number;
  take: number;
  property: string;
  order: boolean;
  keyword: string;
}

class FindAndCount {
  private array: Array<any>;

  private order: boolean;

  private skip: number;

  private take: number;

  private property: string;

  private keyword: string;

  constructor({
    array,
    order,
    property = 'name',
    skip,
    take,
    keyword,
  }: IFakeFindAndCount) {
    this.array = array;
    this.order = order;
    this.property = property;
    this.skip = skip;
    this.take = take;
    this.keyword = keyword;
  }

  public orderArray(): void {
    const dataSorted = this.array.sort((a, b) => {
      if (this.order) {
        if (a[this.property] > b[this.property]) {
          return 1;
        }
        if (b[this.property] > a[this.property]) {
          return -1;
        }
        return 0;
      }
      if (a[this.property] < b[this.property]) {
        return 1;
      }
      if (b[this.property] < a[this.property]) {
        return -1;
      }
      return 0;
    });
    this.array = dataSorted;
  }

  public pages(): void {
    this.array =
      Math.trunc(this.array.length / this.take) >= this.skip
        ? this.array.slice(this.skip, this.take)
        : this.array;
  }

  public items(): void {
    this.array =
      this.array.length >= this.take
        ? this.array.slice(this.skip, this.take)
        : this.array;
  }

  public filter(): void {
    this.array = this.array.filter(element =>
      element[this.property].includes(this.keyword),
    );
  }

  public findAndCount(): Array<any> {
    this.orderArray();
    this.filter();
    this.pages();
    this.items();
    return this.array;
  }
}
export default FindAndCount;
