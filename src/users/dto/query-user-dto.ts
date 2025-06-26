export interface QueryUserDto {
  page?: number;
  size?: number;
  sort?: string;
  filter?: Record<string, unknown>;
}
