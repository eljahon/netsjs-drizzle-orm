import { Global, Module } from '@nestjs/common';
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS,
} from './database.module-definition';
import { DatabaseOptions } from './databaseOptions';
import { Pool } from 'pg';
import { DrizzleService } from './drizzle.service';

@Global()
@Module({
  exports: [DrizzleService],
  providers: [
    DrizzleService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        const { host, user, port, password, database } = databaseOptions;
        return new Pool({
          host,
          port,
          user,
          password,
          database,
        });
      },
    },
  ],
})
export class DatabaseModule extends ConfigurableDatabaseModule {}
