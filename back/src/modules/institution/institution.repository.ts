import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { Repository } from 'typeorm';
import { UpdateInstitutionDto } from './institutionDtos/updateInstitution.dto';
import { SendMailsRepository } from '../send-mails/send-mails.repository';
import { User } from '../users/users.entity';
import { Role } from 'src/enums/enums';

@Injectable()
export class InstitutionRepository {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly sendEmailRepository: SendMailsRepository,
  ) {}
  async getAllInstitutions(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const institutions = await this.institutionRepository.find({
      take: limit,
      skip: skip,
    });
    if (!institutions)
      throw new BadRequestException('No hay instituciones creadas');
    return institutions;
  }

  async getInstitutionById(id: string) {
    const institution = await this.institutionRepository.findOne({
      where: { id },
    });
    if (!institution)
      throw new NotFoundException(`No se encontró institución con el id ${id}`);
    return institution;
  }

  async signUp(institution: Partial<Institution>) {
    if (!institution) throw new BadRequestException();
    //el email existe en alguna otra tabla?
    const { email } = institution;
    const [existEmailInstitution, existEmailUser] = await Promise.all([
      this.institutionRepository.findOneBy({
        email,
      }),
      this.userRepository.findOneBy({ email }),
    ]);
    if (existEmailInstitution) {
      throw new ConflictException('Email de institución.');
    }
    if (existEmailUser) {
      throw new ConflictException('Email de user.');
    }

    const newInstitution = await this.institutionRepository.save(institution);

    const dbInstitution = await this.institutionRepository.findOneBy({
      id: newInstitution.id,
    });
    if (!dbInstitution)
      throw new BadRequestException('Error al crear institución');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, user_id, ...institutionResponse } = dbInstitution;

    await this.sendEmailRepository.sendEmail({
      name: dbInstitution.name,
      email: dbInstitution.email,
    });

    return {
      message: 'Institución registrada exitosamente. ',
      institutionResponse,
    };
  }

  async updateInstitution(id: string, institution: UpdateInstitutionDto) {
    if (!id || !institution) throw new BadRequestException();

    await this.institutionRepository.update(id, institution);

    const updatedInstitution = await this.institutionRepository.findOneBy({
      id,
    });
    if (!updatedInstitution)
      throw new BadRequestException('Error al actualizar institución');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { role, ...updateInstitutionResponse } = updatedInstitution;

    return updateInstitutionResponse;
  }

  async approveInstitution(id: string) {
    const institution = await this.institutionRepository.findOneBy({ id });
    if (!institution) {
      throw new NotFoundException(
        `Este ID: ${id} no corresponde a una institución.`,
      );
    }
    institution.isActive = true;
    const response = await this.institutionRepository.save(institution);
    return response;
  }

  async toRoleAdmin(id: string): Promise<Institution> {
    console.log('Repository: toRoleAdmin called with id:', id);
    const institution = await this.institutionRepository.findOneBy({ id });
    if (!institution) {
      throw new NotFoundException(
        `Este ID: ${id} no corresponde a una institución.`,
      );
    }
    institution.role = Role.admin;
    console.log('Antes de guardar:', institution);
    const response = await this.institutionRepository.save(institution);
    console.log('Después de guardar:', response);
    return response;
  }
}
