import { FilterInput, Primitive } from 'src/common/interfaces/base.interface';

export function buildWhereFilter<T extends Record<string, Primitive>>(
  filters: FilterInput<T> = {},
): Record<string, unknown> {
  const where: Record<string, unknown> = {};

  for (const key in filters) {
    const value = filters[key];
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Nested filter (e.g. { lte: 5 })
      where[key] = { ...value };
    } else {
      // Direct value match (e.g. { name: 'Navid' })
      where[key] = value;
    }
  }

  return where;
}
