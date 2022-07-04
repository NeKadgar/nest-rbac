import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthUserModule } from './authUser/authUser.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '1234',
      signOptions: { expiresIn: '60s' },
    }),
    AuthUserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {};
