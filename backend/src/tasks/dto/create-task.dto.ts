import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  
  @IsNotEmpty()
  @IsNumber()
  columnId: number;
}
