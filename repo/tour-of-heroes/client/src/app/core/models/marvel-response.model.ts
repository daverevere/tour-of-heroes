//capital T is a common way to declare a generic that a developer will specify
export interface MarvelResponse<T> {
  status: string;
  code: number;
  data: {
    count: number;
    limit: number;
    offset: number;
    total: number;
    results: Array<T>;
  }
}
