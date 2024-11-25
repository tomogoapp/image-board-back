import {Field, ObjectType} from '@nestjs/graphql'

@ObjectType()
export class CreateUserResponseDTO {
    @Field(() => String)
    message: string
}