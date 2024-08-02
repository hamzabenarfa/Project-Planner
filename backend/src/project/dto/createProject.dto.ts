import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  // createdAt: Date;
  // updatedAt: Date;

  // @IsNumber()
  // ownerId: number;
}
