import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as express from 'express'
import { graphqlUploadExpress } from 'graphql-upload-ts'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,new ExpressAdapter(),{
    cors:true
  })

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }))

  // Importación dinámica de graphql-upload
  //const { graphqlUploadExpress } = await import('graphql-upload/graphqlUploadExpress.js')

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }),
  )

  await app.listen(3000)
}
bootstrap()
