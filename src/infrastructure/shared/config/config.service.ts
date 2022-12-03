import { Injectable } from '@nestjs/common';
import { SequelizeModuleOptions } from '@nestjs/sequelize/dist/interfaces/sequelize-options.interface';

@Injectable()
export class ConfigService {
  get databaseConfig(): SequelizeModuleOptions {
    return {
      dialect: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    };
  }
}
