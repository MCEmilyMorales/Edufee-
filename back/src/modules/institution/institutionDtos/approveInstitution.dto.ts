import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ApproveInstitutionDto {
  @ApiProperty({
    description: 'Indica si la institución está activa',
    default: true,
  })
  @IsBoolean()
  isActive: boolean;
}
