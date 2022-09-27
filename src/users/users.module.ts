import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import UsersRepository from "../users/users.repository"
@Module({
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: [UsersService]
})
export class UsersModule { }
