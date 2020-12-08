import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphqlConfig } from './configs/config.interface';
import config from './configs/config';

import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

import { AppResolver } from './resolvers/app.resolver';
// import { DateScalar } from './common/scalars/date.scalar';

import { UserModule } from './resolvers/user/user.module';
import { PostModule } from './resolvers/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const graphqlConfig = configService.get<GraphqlConfig>('graphql');
        return {
          buildSchemaOptions: {
            numberScalarMode: 'integer',
          },
          sortSchema: graphqlConfig.sortSchema,
          autoSchemaFile: graphqlConfig.schemaDestination,
          debug: graphqlConfig.debug,
          playground: graphqlConfig.playgroundEnabled,
          context: ({ req }) => ({ req }),
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
