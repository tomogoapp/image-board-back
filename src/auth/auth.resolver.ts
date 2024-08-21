import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { CreateUserResponseDTO, LoginResponseDTO } from './dto'
import { LogoutUserResponseDTO } from './dto/logout-user-response.dto'

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

/**
 * The Login function in TypeScript takes a username and password as arguments and returns a Promise of
 * LoginResponseDTO after calling the login method of the authService.
 * @param {string} username - The `username` parameter is a string that represents the username
 * provided by the user during the login process.
 * @param {string} password - The `password` parameter in the `Login` function is a string type. It is
 * used to store the password provided by the user during the login process.
 * @returns The `Login` method is returning a `Promise` that resolves to a `LoginResponseDTO` object.
 * The `LoginResponseDTO` object is likely a data transfer object that contains information about the
 * login operation, such as a token or user details.
 */
  @Query(() => LoginResponseDTO,{name: 'login_user'})
  async Login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<LoginResponseDTO> {
    return this.authService.login({username,password})
  }

/**
 * The function `createUser` in TypeScript creates a new user by calling the `create` method of the
 * `authService` with the provided username, email, password, and confirmPassword.
 * @param {string} username - The `username` parameter is a string that represents the username of the
 * user being created. It is provided as an argument to the `createUser` function.
 * @param {string} email - The `email` parameter in the `createUser` function is a string type argument
 * that represents the email address of the user being created. It is one of the required fields for
 * creating a new user in the system.
 * @param {string} password - It looks like you are trying to create a user with the provided username,
 * email, password, and confirmPassword. If you have any specific question or need assistance with the
 * password parameter, please let me know how I can help you.
 * @param {string} confirmPassword - The `confirmPassword` parameter is used to confirm the password
 * entered by the user during the registration process. It is typically used to ensure that the user
 * has entered the correct password by asking them to re-enter it for verification. This helps in
 * reducing errors and ensuring that the user has entered the desired password
 * @returns The `createUser` function is returning a Promise that resolves to a `CreateUserResponseDTO`
 * object. This object is created by calling the `create` method of the `authService` with the
 * `username`, `email`, `password`, and `confirmPassword` parameters.
 */
  @Mutation(() => CreateUserResponseDTO,{name:'create_user'})
  async createUser(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
    @Args('confirmPassword') confirmPassword: string,
  ): Promise<CreateUserResponseDTO> {
    return this.authService.create({username,email,password,confirmPassword})
  }

  // @Mutation(() => CreateUserResponseDTO,{name:'create_user'})
  // async createUser(
  //   @Args('username') username: string,
  //   @Args('email') email: string,
  //   @Args('password') password: string,
  //   @Args('confirmPassword') confirmPassword: string,
  // ) {
  //   return {message:'dsadasdsa'}
  // }


/**
 * The logOutUser function logs out a user by calling the logout method of the authService with the
 * provided token.
 * @param {string} token - The `token` parameter in the `logOutUser` function is a string that
 * represents the authentication token of the user who wants to log out. This token is used to identify
 * and authenticate the user before logging them out of the system.
 * @returns The `logOutUser` function is returning a `Promise` that resolves to a
 * `LogoutUserResponseDTO` object.
 */
  @Mutation(() => LogoutUserResponseDTO,{name:'logout'})
  async logOutUser(
    @Args('token') token: string,
  ): Promise<LogoutUserResponseDTO> {
    return this.authService.logout({token})
  }

}
