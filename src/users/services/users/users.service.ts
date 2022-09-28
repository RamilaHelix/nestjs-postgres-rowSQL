import { Injectable } from '@nestjs/common';
import UserDto from 'src/users/models/userDto.model';
import UsersRepository from '../../users.repository';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) { }

    getUsers() {
        return this.usersRepository.getAll();
    }

    getUserById(id: number) {
        return this.usersRepository.getById(id);
    }

    createUser(userData: UserDto) {
        return this.usersRepository.create(userData);
    }

    updateUser(id: number, userData: UserDto) {
        return this.usersRepository.update(id, userData);
    }

    deleteUser(id: number) {
        return this.usersRepository.delete(id);
    }
}
