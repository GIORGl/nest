import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/users/dtos/new-user.dto';
import { UserDetails } from 'src/users/user-details.interface';
import { ExsistingUserDTO } from 'src/users/dtos/existing-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(
    user: Readonly<NewUserDTO>,
  ): Promise<UserDetails | null | string> {
    const { name, email, password } = user;

    const existingUser = await this.usersService.findByEmail(email);

    if (existingUser) return 'Email taken!';

    const hashsedPassword = await this.hashPassword(password);

    const newUser = await this.usersService.create(
      name,
      email,
      hashsedPassword,
    );

    return this.usersService.getUserDetails(newUser);
  }

  async doesThePasswordMatch(
    password: string,
    hashsedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashsedPassword);
  }

  async validate(email: string, password: string): Promise<UserDetails | null> {
    const user = await this.usersService.findByEmail(email);

    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesThePasswordMatch = await this.doesThePasswordMatch(
      password,
      user.password,
    );

    if (!doesThePasswordMatch) return null;

    return this.usersService.getUserDetails(user);
  }

  async login(
    existingUser: ExsistingUserDTO,
  ): Promise<{ token: string } | null> {
    const { email, password } = existingUser;

    const user = await this.validate(email, password);

    if (!user) return null;

    const jwt = await this.jwtService.signAsync({ user });

    return { token: jwt };
  }
}
