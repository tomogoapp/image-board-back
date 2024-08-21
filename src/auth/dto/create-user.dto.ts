
import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { validRoles } from '../interface';

@InputType()
export class CreateUserDTO {
    @Field(() => String)
    username: string

    @Field(() => String)
    @IsEmail()
    email: string

    @Field(() => String)
    password: string

    @Field(() => String)
    confirmPassword: string
}