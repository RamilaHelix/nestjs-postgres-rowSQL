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
    getPosts() {
        return this.usersService.getPosts();
    }

    @Get(':id')
    getPostById(@Param() { id }) {
        return this.usersService.getUserById(id);
    }

    @Put(':id')
    updatePost(@Param() { id }, @Body() postData: UserDto) {
        return this.usersService.updateUser(id, postData);
    }

    @Post()
    createPost(@Body() postData: UserDto) {
        return this.usersService.createUser(postData);
    }

    @Delete(':id')
    deletePost(@Param() { id }) {
        return this.usersService.deleteUser(id);
    }

}