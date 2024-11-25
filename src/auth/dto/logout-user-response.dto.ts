import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType()
export class LogoutUserResponseDTO {
    @Field(() => String)
    message: string
}