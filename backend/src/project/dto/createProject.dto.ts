import {
  IsNumber,
  IsString,
  Min,
  Max,
  IsDate,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  pinned: boolean = false;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalTasks: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  tasksCompleted: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  progress: number;

  @IsOptional()
  @IsDate()
  createdAt: Date;

  @IsOptional()
  @IsDate()
  updatedAt: Date;
}
