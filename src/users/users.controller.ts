import { Controller, Get, Param } from '@nestjs/common';
import { UserDetails } from './user-details.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UserService: UsersService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.UserService.findById(id);
  }
}
