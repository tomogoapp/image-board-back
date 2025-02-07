import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class LogoutUserDTO {
  @Field(() => String)
  token: string
}