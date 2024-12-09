import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { User } from './entities/user.entity'
import { CreateUserResponseDTO, LoginResponseDTO, UserResponseDTO } from './dto'
import { LogoutUserResponseDTO } from './dto/logout-user-response.dto'

@Resolver(() => User)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}
  
/**
 * The Login function in this TypeScript code asynchronously authenticates a user with a username and
 * password, sets an authentication token in a cookie, and returns a response with a success message
 * and user information.
 * @param {string} username - The `username` parameter is a string that represents the username
 * provided by the user during the login process. It is used to identify the user and authenticate
 * them.
 * @param {string} password - The `password` parameter in the `Login` function is a string that
 * represents the user's password input during the login process. It is used along with the `username`
 * parameter to authenticate the user and generate a token for authorization.
 * @param {any} context - The `context` parameter in the `Login` method is used to access the context
 * object, which contains information about the current request and response. In this specific case,
 * the `context` parameter is used to set a cookie named 'auth_token' in the response object. This
 * cookie contains the authentication
 * @returns The Login function is returning a Promise that resolves to a UserResponseDTO object. The
 * UserResponseDTO object contains a message "Bienvenido", a success boolean value, and user
 * information. The function also sets a cookie named 'auth_token' in the response with the token value
 * received from the authService.login function.
 */

  @Query(() => LoginResponseDTO,{name: 'login_user'})
  async Login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<UserResponseDTO> { //Promise<LoginResponseDTO>
    //return this.authService.login({username,password})

    const { token,success, user} = await this.authService.login( {username,password} )

    context.res.cookie('auth_token', token, {
      httpOnly: process.env.NODE_ENV === 'production', // true | false
      secure: process.env.NODE_ENV === 'production', // true
      sameSite: 'Lax', // Más permisivo pero seguro | strict
      maxAge: 86400000
    })

    return {
      message: 'Bienvenido', 
      success, 
      user
    }
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
