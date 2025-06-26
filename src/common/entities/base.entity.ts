import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export interface IBaseEntity {
  readonly id: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  archivedAt: Date | null;
}

export class BaseEntity implements IBaseEntity {
  @Exclude()
  @ApiHideProperty()
  readonly id: number;

  @ApiProperty({ description: 'Creation timestamp' })
  readonly createdAt: Date;

  @ApiProperty({ description: 'Last update timestamp' })
  readonly updatedAt: Date;

  @ApiProperty({
    description: 'Archival timestamp; null if active',
    required: false,
    nullable: true,
  })
  archivedAt: Date | null;
}
