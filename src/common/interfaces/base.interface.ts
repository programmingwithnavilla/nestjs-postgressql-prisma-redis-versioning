export interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  filters?: Record<string, unknown>;
}

export type Primitive = string | number | boolean | null;
export type FilterOperator =
  | 'eq'
  | 'lt'
  | 'lte'
  | 'gt'
  | 'gte'
  | 'contains'
  | 'startsWith'
  | 'endsWith';

export type FilterInput<T> = {
  [K in keyof T]?:
    | T[K]
    | {
        [P in FilterOperator]?: T[K];
      };
};
