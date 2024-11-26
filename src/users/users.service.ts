import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
    },
    {
      id: 2,
      name: 'Jane Doe',
    },
    {
      id: 3,
      name: 'Alice',
    },
  ];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => {
        return user.name.toLowerCase().includes(name.toLowerCase());
      });
    }
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(data: createUserDto): User {
    const newUser = { id: Date.now(), ...data };
    this.users.push(newUser);

    return newUser;
  }
}
