import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { Repository } from 'typeorm';
import { UpdateInstitutionDto } from './institutionDtos/updateInstitution.dto';
import { SendMailsRepository } from '../send-mails/send-mails.repository';
import { User } from '../users/users.entity';
import { Role } from 'src/enums/enums';
import { InstitutionRole } from 'src/enums/institution.enum';

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

  async getNamesInstitutions() {
    const institutions = await this.institutionRepository.find({
      select: ['name'],
    });
    if (!institutions)
      throw new BadRequestException(`No hay instituciones creadas`);

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

    await this.sendEmailRepository.sendReviewEmail({
      name: dbInstitution.name,
      email: dbInstitution.email,
    });

    return {
      message: 'Institución registrada exitosamente. ',
      institutionResponse,
    };
  }

  async updateInstitution(id: string, institution: UpdateInstitutionDto) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al intentar actualizar institución`,
      );
    }
  }

  async approveInstitution(id: string, status: InstitutionRole) {
    try {
      const institution = await this.institutionRepository.findOneBy({ id });
      if (!institution) {
        throw new NotFoundException(
          `Este ID: ${id} no corresponde a una institución.`,
        );
      }

      if (
        status !== InstitutionRole.approved &&
        status !== InstitutionRole.denied
      ) {
        throw new BadRequestException(`Status debe ser aproved o denied`);
      }

      if (status === InstitutionRole.approved) {
        institution.isActive = InstitutionRole.approved;
        await this.sendEmailRepository.sendApprovalEmail(institution);
      } else if (status === InstitutionRole.denied) {
        institution.isActive = InstitutionRole.denied;
        await this.sendEmailRepository.sendRejectionEmail(institution);
      }

      const response = await this.institutionRepository.save(institution);
      return response;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          `Error al intentar aprobar la institución.`,
        );
      }
    }
  }

  async toRoleAdmin(id: string): Promise<Institution> {
    try {
      const institution = await this.institutionRepository.findOneBy({ id });
      if (!institution) {
        throw new NotFoundException(
          `Este ID: ${id} no corresponde a una institución.`,
        );
      }
      institution.role = Role.admin;

      const response = await this.institutionRepository.save(institution);

      return response;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error al intentar hacer Admin a una institución.`,
      );
    }
  }
}
