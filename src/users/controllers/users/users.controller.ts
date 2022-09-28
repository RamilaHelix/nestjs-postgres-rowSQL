import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import UserDto from 'src/users/models/userDto.model';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    getUsersById(@Param() { id }) {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    updateUser(@Param() { id }, @Body() userData: UserDto) {
        return this.usersService.updateUser(id, userData);
    }

    @Post()
    createUser(@Body() userData: UserDto) {
        return this.usersService.createUser(userData);
    }

    @Delete(':id')
    deleteUser(@Param() { id }) {
        return this.usersService.deleteUser(id);
    }

}