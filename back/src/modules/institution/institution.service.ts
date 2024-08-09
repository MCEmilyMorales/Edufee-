import { Injectable } from '@nestjs/common';
import { InstitutionRepository } from './institution.repository';
import { Institution } from './institution.entity';
import { UpdateInstitutionDto } from './institutionDtos/updateInstitution.dto';
import { InstitutionRole } from 'src/enums/institution.enum';

@Injectable()
export class InstitutionService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}
  getAllInstitutions(page: number, limit: number) {
    return this.institutionRepository.getAllInstitutions(page, limit);
  }

  getNamesInstitutions() {
    return this.institutionRepository.getNamesInstitutions();
  }

  getInstitutionById(id: string) {
    return this.institutionRepository.getInstitutionById(id);
  }

  signUp(institution: Partial<Institution>) {
    return this.institutionRepository.signUp(institution);
  }

  updateInstitution(id: string, institution: UpdateInstitutionDto) {
    return this.institutionRepository.updateInstitution(id, institution);
  }

  approveInstitution(id: string, status: InstitutionRole) {
    return this.institutionRepository.approveInstitution(id, status);
  }

  toRoleAdmin(id: string): Promise<Institution> {
    return this.institutionRepository.toRoleAdmin(id);
  }
}
