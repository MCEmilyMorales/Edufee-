import { Injectable } from '@nestjs/common';
import { InstitutionRepository } from './institution.repository';

@Injectable()
export class InstitutionService {
  constructor(private readonly institutionRepository: InstitutionRepository) {}
  getAllInstitutions(page: number, limit: number) {
    return this.institutionRepository.getAllInstitutions(page, limit);
  }

  getInstitutionById(id: string) {
    return this.institutionRepository.getInstitutionById(id);
  }
}
