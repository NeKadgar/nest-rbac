import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Prisma, AuthUser, UserTypes } from "@prisma/client";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt"
import { Config } from "src/config";

@Injectable()
export class AuthUserService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordService: PasswordService,
        private readonly jwtService: JwtService
    ) {};

    async createUser(data: { login: string, password: string }): Promise<AuthUser> {
        let passwordHash = this.passwordService.createPasswordHash(data.password);
        return this.prisma.authUser.create({
            data: {
                login: data.login,
                hash: passwordHash
            }
        });
    }

    async getUserToken(data: { login: string, password: string }) {
        const user = await this.prisma.authUser.findFirst({
            where: { 
                login: data.login
            }
        });

        if (!user) {
            throw new NotFoundException(`No user found for login: ${data.login}`);
        }

        const isPasswordValid = this.passwordService.validatePassword(data.password, user.hash);

        if (!isPasswordValid) {
            throw new BadRequestException("Invalid password");
        }

        return await this.generateToken({
            id: user.id,
            role: user.userType
        })
    }

    private async generateToken(payload: { id: string, role: string }): Promise<any> {
        const accessToken = await this.jwtService.signAsync(payload);
        
        const securityConfig = Config.security;
        const refreshToken = await this.jwtService.signAsync(payload, {expiresIn: securityConfig.refreshIn});
        return {
            accessToken,
            refreshToken,
        }
    }
}
