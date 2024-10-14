import { MiddlewareConsumer,Module,NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { PostModule } from './post/post.module'
import { AuthModule } from './auth/auth.module'
import { S3Module } from './s3/s3.module'
import { graphqlUploadExpress } from 'graphql-upload'
import {
  ApolloServerPluginLandingPageLocalDefault,
} from '@apollo/server/plugin/landingPage/default'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: parseInt(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_DATABASE,
      entities:[join(__dirname,'**','*.entity.{ts,js}')],
      synchronize: true
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      imports: [ConfigModule],
      driver: ApolloDriver,
      useFactory: async () => ({
        playground: false,
        uploads: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
        //csrfPrevention: false, // Deshabilita la protección CSRF
        autoSchemaFile:join(process.cwd(),'src/schema.gql'),
        context: ({ req }) => ({ req }),
      }),
    }),
    PostModule,
    AuthModule,
    S3Module,
  ],
})
// export class AppModule implements NestModule {

//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }))
//       .forRoutes('graphql')
//   }

// }

export class AppModule {}
