import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ServiceEncryption {
  async passwordEncrypted(password: string) {
    return bcrypt.hash(password, 10);
  }
  async comparePassword(passwordInput: string, passwordDB: string) {
    return bcrypt.compare(passwordInput, passwordDB);
  }
}
