export interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: Record<string, unknown>;
}
