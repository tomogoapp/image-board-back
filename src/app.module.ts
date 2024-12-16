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
import { ChannelsModule } from './channels/channels.module'
import { RepliesModule } from './replies/replies.module'
import { ThreadModule } from './thread/thread.module';
import GraphQLJSON from 'graphql-type-json/lib/index'


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
        cors: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
        csrfPrevention: false, // Deshabilita la protección CSRF
        autoSchemaFile:join(process.cwd(),'src/schema.gql'),
        context: ({ req, res }) => ({ req, res }),
        resolvers: { JSON: GraphQLJSON },
      }),
    }),
    PostModule,
    AuthModule,
    S3Module,
    ChannelsModule,
    RepliesModule,
    ThreadModule,
  ],
})

export class AppModule {}
