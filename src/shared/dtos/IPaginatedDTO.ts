enum EOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}
export interface IPagination {
  keyword: string;
  order: boolean;
  take: number;
  skip: number;
}
export { IPagination as default, EOrder };
