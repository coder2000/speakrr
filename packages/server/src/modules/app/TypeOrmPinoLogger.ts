/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger, QueryRunner } from 'typeorm';
import { PinoLogger } from 'nestjs-pino';

export class TypeOrmPinoLogger implements Logger {
  constructor(private readonly logger: PinoLogger) {}

  logQuery(query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    const sql =
      query +
      (parameters && parameters.length ? ` -- PARAMETERS: ${TypeOrmPinoLogger.stringifyParams(parameters)}` : '');
    this.logger.debug(sql);
  }

  logQueryError(_error: string, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    const sql =
      query +
      (parameters && parameters.length ? ` -- PARAMETERS: ${TypeOrmPinoLogger.stringifyParams(parameters)}` : '');
    this.logger.error(sql);
  }

  logQuerySlow(_time: number, query: string, parameters?: any[], _queryRunner?: QueryRunner) {
    const sql =
      query +
      (parameters && parameters.length ? ` -- PARAMETERS: ${TypeOrmPinoLogger.stringifyParams(parameters)}` : '');
    this.logger.info(sql);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  logMigration(message: string, _queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  log(level: 'log' | 'info' | 'warn', message: any, _queryRunner?: QueryRunner) {
    switch (level) {
      case 'log':
      case 'info':
        this.logger.info(message);
        break;
      case 'warn':
        this.logger.warn(message);
        break;
      default:
        break;
    }
  }

  protected static stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
