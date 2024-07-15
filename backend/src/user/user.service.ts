import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseService } from 'src/database/database.service';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) throw new ForbiddenException('User Exists');

    const hash = await argon.hash(dto.password);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });
    return { id: newUser.id, email: newUser.email, role: newUser.role };
  }
}
