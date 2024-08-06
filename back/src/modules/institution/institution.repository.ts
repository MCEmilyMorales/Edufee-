import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Institution } from './institution.entity';
import { Repository } from 'typeorm';
import { UpdateInstitutionDto } from './institutionDtos/updateInstitution.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailInstitutionDto } from './institutionDtos/createInstitution.dto';
import { SendMailsRepository } from '../send-mails/send-mails.repository';
import { ApproveInstitutionDto } from './institutionDtos/approveInstitution.dto';

@Injectable()
export class InstitutionRepository {
  constructor(
    @InjectRepository(Institution)
    private readonly institutionRepository: Repository<Institution>,
    private readonly jwtService: JwtService,
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

    return institutionResponse;
  }

  async signIn(emailInstitutionDto: EmailInstitutionDto) {
    if (!emailInstitutionDto) {
      throw new BadRequestException('Email es requerido');
    }
    const { email } = emailInstitutionDto;
    const institution = await this.institutionRepository.findOneBy({ email });
    if (!institution) {
      throw new BadRequestException('Email de la institucion no creado.');
    }
    const payload = {
      email: institution.email,
      roles: [institution.role],
    };
    console.log('signin de institucion/ repository: ', payload);

    const token = this.jwtService.sign(payload);
    return { message: 'Institución logueada correctamente', token };
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
}
