import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectMemeberDto } from './create-project_memeber.dto';

export class UpdateProjectMemeberDto extends PartialType(
  CreateProjectMemeberDto,
) {}
