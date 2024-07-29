import { Injectable } from '@nestjs/common';
import { InstitutionRepository } from './institution.repository';
import { Institution } from './institution.entity';

@Injectable()
export class InstitutionService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}
  getAllInstitutions(page: number, limit: number) {
    return this.institutionRepository.getAllInstitutions(page, limit);
  }

  getInstitutionById(id: string) {
    return this.institutionRepository.getInstitutionById(id);
  }

  signUp(institution: Partial<Institution>) {
    return this.institutionRepository.signUp(institution);
  }
}
