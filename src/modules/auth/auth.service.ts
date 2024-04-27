import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserDto } from '../user/dto/user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * @description Create a new user and returns a logged user
   * @param {CreateUserDto} createUserDto 
   * @returns user
   */
  public async create(createUserDto: CreateUserDto) {

    const user = await this.userService.create({
      ...createUserDto,
      password: this.hashPassword(createUserDto.password)
    });

    if (user !== null) {
      const token = await this.generateToken({ id: user.id });

      return { user, token };
    }

    return null;

  }


  /**
   * 
   * @param user 
   * @returns 
   */
  public async login(loginUserDto: LoginUserDto) {

    const { email, password } = loginUserDto;

    const user = await this.userService.findOneByEmail( email );

    if(!user) {
      throw new UnauthorizedException('Not valid credentials');
    }

    if(!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credentials');
    }

    delete user.password;

    return {
      ...user,
      token: this.generateToken({ id: user.id })
    }
  }

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      return null;
    }

    // find if user password match
    const match = await this.comparePassword(pass, user.password);
    if (!match) {
      return null;
    }

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = user['dataValues'];
    return result;
  }



  private generateToken(payload: JwtPayload): string {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private hashPassword(password): string {
    const hash = bcrypt.hashSync(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}