import { NestFactory } from '@nestjs/core'
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { graphqlUploadExpress } from 'graphql-upload-ts'
import { ValidationPipe } from '@nestjs/common'
import cors from 'cors'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  )

  // app.enableCors({
  //   origin: ['http://localhost:8080','http://localhost:5018','https://kprhmg14-8080.usw3.devtunnels.ms','*'], // Especifica el origen permitido
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: true,
  //   allowedHeaders: 'Content-Type, Authorization',
  // })

  //app.enableCors()
  

  // app.setGlobalPrefix('api',{
  //   exclude: ['/graphql'],
  // })

  app.use(
    graphqlUploadExpress({ 
      maxFileSize: 10000000, maxFiles: 1 
    }),
    cors<cors.CorsRequest>({
      origin: ['http://localhost:8080'],
      credentials: true,
      //methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      methods: 'POST',
      allowedHeaders: 'Content-Type, Authorization,Apollo-Require-Preflight',
    }),
    cookieParser()
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  await app.listen(3000)
}
bootstrap()
