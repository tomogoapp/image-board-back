
import { Injectable } from '@nestjs/common';
import { S3Client,PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { ConfigService } from '@nestjs/config'
import { Readable } from 'stream'

@Injectable()
export class S3Service {

    private s3Client: S3Client
    private bucketName: string


    constructor(private configService: ConfigService) {
        this.bucketName = this.configService.get<string>('MINIO_BUCKET')

        this.s3Client = new S3Client({
            endpoint: this.configService.get<string>('MINIO_ENDPOINT'),
            region: 'us-east-1',
            credentials:{
                accessKeyId: this.configService.get<string>('MINIO_ACCESS_KEY'),
                secretAccessKey: this.configService.get<string>('MINIO_SECRET_KEY')
            },
            forcePathStyle:true
        })
    }

    async uploadFile(key: string,body: Readable, contentType:string): Promise<string>{
        try{

            const upload = new Upload({
                client: this.s3Client,
                params:{
                    Bucket: this.bucketName,
                    Key: key,
                    Body: body,
                    ContentType: contentType
                }
            })

            // Opcional: manejar eventos de progreso
            upload.on('httpUploadProgress', (progress) => {
                console.log(`Uploaded ${progress.loaded} bytes`)
            });

            await upload.done()

            const fileUrl = `${this.configService.get<string>('MINIO_ENDPOINT')}/${this.bucketName}/${key}`
            return fileUrl

        }catch(error){
            console.error('Error uploading file:', error)
            throw new Error('Error uploading file')
        }

        // await this.s3Client.send(command)
        // const fileUrl= `${this.configService.get<string>('MINIO_ENDPOINT')}/${this.bucketName}/${key}`
        // return fileUrl
    }

    async getFile(key:string):Promise<Readable>{
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key:key
        })

        const response = await this.s3Client.send(command)

        return response.Body as Readable
    }

}