
import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LoginUserDTO {
  @Field(() => String)
  username: string

  @Field(() => String)
  password: string
}