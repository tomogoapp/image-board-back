import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { graphqlUploadExpress } from 'graphql-upload-ts'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,new ExpressAdapter(),{
    cors:true
  })

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1 }));

  

  await app.listen(3000)
}
bootstrap()
