import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamMemberDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
