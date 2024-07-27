import { Controller, Get, Param, Query } from '@nestjs/common';
import { InstitutionService } from './institution.service';

@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}
  @Get()
  getAllInstitutions(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    !page ? (page = '1') : page;
    !limit ? (limit = '5') : limit;
    if (page && limit)
      return this.institutionService.getAllInstitutions(
        Number(page),
        Number(limit),
      );
  }

  @Get(':id')
  getInstitutionByEmail(@Param('email') id: string) {
    return this.institutionService.getInstitutionById(id);
  }
}
