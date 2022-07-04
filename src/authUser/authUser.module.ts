import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthUserController } from './authUser.controller';
import { AuthUserService } from './authUser.service';
import { PasswordService } from './password.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '60s' },
    })
  ],
  controllers: [AuthUserController],
  providers: [PasswordService, AuthUserService, PrismaService],
})

export class AuthUserModule {};
