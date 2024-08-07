import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  kanbanId: number;
}
