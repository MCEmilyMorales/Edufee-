import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import { createInstitutionDto } from './institutionDtos/createInstitution.dto';
import { UpdateInstitutionDto } from './institutionDtos/updateInstitution.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Institucion')
@Controller('institution')
export class InstitutionController {
  constructor(private readonly institutionService: InstitutionService) {}
  
  @ApiBearerAuth()
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

  @ApiBearerAuth()
  @Get(':id')
  getInstitutionByEmail(@Param('email') id: string) {
    return this.institutionService.getInstitutionById(id);
  }

  @ApiBearerAuth()
  @Post('signup')
  signUp(@Body() institution: createInstitutionDto) {
    return this.institutionService.signUp(institution);
  }

  @ApiBearerAuth()
  @Put(':id')
  updateInstitution(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() institution: UpdateInstitutionDto,
  ) {
    return this.institutionService.updateInstitution(id, institution);
  }
}
