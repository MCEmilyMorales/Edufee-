import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InstitutionService } from './institution.service';
import {
  CreateInstitutionDto,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  EmailInstitutionDto,
} from './institutionDtos/createInstitution.dto';
import { UpdateInstitutionDto } from './institutionDtos/updateInstitution.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Institucion')
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

  @ApiBearerAuth()
  @Get(':id')
  getInstitutionById(@Param('id') id: string) {
    return this.institutionService.getInstitutionById(id);
  }

  @ApiBearerAuth()
  @Post('signup')
  signUp(@Body() institution: CreateInstitutionDto) {
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

  @ApiBearerAuth()
  @Put('approve/:id')
  approveInstitution(@Param('id') id: string) {
    return this.institutionService.approveInstitution(id);
  }
}
