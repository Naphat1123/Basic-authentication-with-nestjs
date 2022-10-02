import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private readonly user = [
    {
      id: 1,
      username: 'username',
      password: 'password',
    },
    {
      id: 2,
      username: 'username2',
      password: 'password2',
    },
  ];

  async findOne(username: string) {
    return this.user.find((user) => user.username === username);
  }
}
