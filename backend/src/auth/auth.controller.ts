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

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge: 15 * 60 * 1000, // 15 minutes for access token
};

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for refresh token
};

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signupLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokens = await this.authService.signupLocal(dto);
    res.cookie('access_token', tokens.access_token, COOKIE_OPTIONS);
    res.cookie('refresh_token', tokens.refresh_token, REFRESH_COOKIE_OPTIONS);
    return { message: 'Signup successful' };
  }

  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  async signinLocal(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const tokens = await this.authService.signinLocal(dto);
    res.cookie('access_token', tokens.access_token, COOKIE_OPTIONS);
    res.cookie('refresh_token', tokens.refresh_token, REFRESH_COOKIE_OPTIONS);
    return { message: 'Signin successful' };
  }

  @UseGuards(AtGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUserId() userId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    res.clearCookie('access_token', COOKIE_OPTIONS);
    res.clearCookie('refresh_token', REFRESH_COOKIE_OPTIONS);
    await this.authService.logout(userId);
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
  ): Promise<void> {
    const tokens = await this.authService.refresh(userId, refreshToken);
    res.cookie('access_token', tokens.access_token, COOKIE_OPTIONS);
    res.cookie('refresh_token', tokens.refresh_token, REFRESH_COOKIE_OPTIONS);
  }
}
