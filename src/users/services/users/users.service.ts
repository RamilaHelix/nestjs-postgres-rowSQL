import { Injectable } from '@nestjs/common';
import UserDto from 'src/users/models/userDto.model';
import UsersRepository from '../../users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    getPosts() {
        return this.usersRepository.getAll();
    }

    getUserById(id: number) {
        return this.usersRepository.getById(id);
    }

    createUser(postData: UserDto) {
        return this.usersRepository.create(postData);
    }

    updateUser(id: number, postData: UserDto) {
        return this.usersRepository.update(id, postData);
    }

    deleteUser(id: number) {
        return this.usersRepository.delete(id);
    }
}
