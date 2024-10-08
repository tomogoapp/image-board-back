
import { Injectable } from '@nestjs/common';
import { S3Client,PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
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
        const command = new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: body,
            ContentType: contentType
        })

        await this.s3Client.send(command)
        const fileUrl= `${this.configService.get<string>('MINIO_ENDPOINT')}/${this.bucketName}/${key}`
        return fileUrl
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