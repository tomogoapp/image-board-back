import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class LoginResponseDTO {
  @Field(() => String)
  token: string;

  @Field(() => String)
  message: string;

  @Field(() => User)
  user: User;
}