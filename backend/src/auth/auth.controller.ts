import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AtGuard, RtGuard } from 'src/common/guards';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { Response } from 'express';
import { Tokens } from './types';
import { clearAuthCookies, setAuthCookies } from 'src/common/utils/cookie.util';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const tokens = await this.authService.signupLocal(dto);
    setAuthCookies(res, tokens);
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const tokens = await this.authService.signinLocal(dto);
    setAuthCookies(res, tokens);
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await this.authService.logout(userId);
    clearAuthCookies(res);
    return { message: 'Logged out successfully' };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Tokens> {
    const tokens = await this.authService.refresh(userId, refreshToken);
    setAuthCookies(res, tokens);
    return {
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
    };
  }
}
