interface QueryParams {
  page?: number;
  size?: number;
  sort?: string;
  filter?: Record<string, unknown>;
}

export abstract class BaseRepository<T> {
  constructor(protected readonly model: any) {}

  async findMany(params: QueryParams) {
    const { page = 1, size = 10, sort = 'id:asc', filter = {} } = params;
    const orderBy = { [sort.split(':')[0]]: sort.split(':')[1] };
    return this.model.findMany({
      skip: (page - 1) * size,
      take: size,
      where: this.buildFilter(filter),
      orderBy,
    });
  }

  private buildFilters(filters: Record<string, any>) {
    const where: Record<string, any> = {};
    for (const key in filters) {
      if (typeof filters[key] === 'object') {
        for (const op in filters[key]) {
          where[key] = { [op]: filters[key][op] };
        }
      } else {
        where[key] = filters[key];
      }
    }
    return where;
  }
}
