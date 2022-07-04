import { Injectable } from "@nestjs/common";
import { compareSync, hashSync } from "bcryptjs";


@Injectable()
export class PasswordService {
    createPasswordHash(password: string) {
        return hashSync(password, 8);
    }

    validatePassword(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword);
    }
}