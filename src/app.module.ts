import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import configuration from './config/configuration';
import { UserModule } from './api/user/user.module';
import { MinioModule } from './api/minio/minio.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { DatabaseModule } from './databases/database.module';
import { DatabaseOptions } from './databases/databaseOptions';
import { RolesModule } from './api/roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    DatabaseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { host, port, database, user, password } =
          configService.get('database') as DatabaseOptions;
        return { host, port, database, user, password };
      },
    }),

    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 5,
      },
    ]),
    UserModule,
    AuthModule,
    MinioModule,
    RolesModule,
    // SeedModule,
  ],
  // providers: [AppService],
  // controllers: [AppController],
})
export class AppModule {}
