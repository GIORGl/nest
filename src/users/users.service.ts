import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      return null;
    }
    return this.getUserDetails(user);
  }

  create(
    name: string,
    email: string,
    hashsedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashsedPassword,
    });

    return newUser.save();
  }
}
