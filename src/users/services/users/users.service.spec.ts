import { Test, TestingModule } from '@nestjs/testing';
import { Pool } from 'pg';
import { CONNECTION_POOL, ConfigurableDatabaseModule, DATABASE_OPTIONS } from '../../../database/database.module-definition';
import DatabaseOptions from '../../../database/databaseOptions';
import DatabaseService from '../../../database/database.service';
import databaseModule from '../../../database/database.module';
import UsersRepository from '../../users.repository';
import { UsersService } from './users.service';

const database = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "root",
    database: "users",
}
describe('User Service', () => {
    let service: UsersService;
    const dto = {
        id: 32,
        name: "John",
        email: "john@some.com"
    }
    const inputDto = {
        name: "John",
        email: "john@some.com"
    }

    const arrUsers = [{
        id: 32,
        name: "John",
        email: "john@some.com"
    },
    {
        id: 33,
        name: "mike",
        email: "mike@some.com"
    },
    ]
    const mockRepo = {
        create: jest.fn(dto => {
            return { ...dto }
        }),
        update: jest.fn((id, dto) => {
            return { id, ...dto }
        }),
        delete: jest.fn(id => {
            if (id === 32) // checking if user exits
                return "user is being delete"
            else "Not Found !"
        }),
        getById: jest.fn(id => {
            return dto;
        }),
        getAll: jest.fn(id => {
            return arrUsers;
        }),
    }
    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [UsersService],
            providers: [
                UsersRepository
            ]
        })
            .overrideProvider(UsersRepository)
            .useValue(mockRepo)
            .compile();

        service = app.get<UsersService>(UsersService);
    });


    it('create a user', () => {
        expect(service.createUser(dto))
            .toEqual({
                name: "John",
                email: "john@some.com",
                id: expect.any(Number)
            })
    })

    it('update a user', () => {
        expect(service.updateUser(32, inputDto))
            .toEqual({ ...inputDto, id: expect.any(Number) })
        expect(mockRepo.update).toHaveBeenCalledWith(32, inputDto)
    })

    it('return single User', () => {
        expect(service.getUserById(32)).toEqual(dto)
    })

    it('return Users', () => {
        expect(service.getUsers()).toEqual(arrUsers)
        expect(mockRepo.getAll).toHaveBeenCalledWith()
    })

    it('delete a user', () => {
        expect(service.deleteUser(32)).toEqual("user is being delete")
        expect(mockRepo.delete).toHaveBeenCalledWith(32)
    })

});
