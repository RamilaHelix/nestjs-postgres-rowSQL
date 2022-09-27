import { Injectable, NotFoundException } from '@nestjs/common';
import DatabaseService from '../database/database.service';
import UserModel from './models/user.model';
import UserDto from './models/userDto.model';

@Injectable()
class UsersRepository {
    constructor(private readonly databaseService: DatabaseService) { }

    async getAll() {
        const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM users
    `);
        return databaseResponse.rows;
    }

    async getById(id: number) {
        const databaseResponse = await this.databaseService.runQuery(
            ` SELECT * FROM users WHERE id=${id}`
        );
        const entity = databaseResponse.rows[0];
        if (!entity) {
            throw new NotFoundException();
        }
        return entity;
    }

    async delete(id: number) {
        const databaseResponse = await this.databaseService.runQuery(
            `DELETE FROM users WHERE id=${id}`
        );
        if (databaseResponse.rowCount === 0) {
            throw new NotFoundException(404, "user Not found");
        }
        return "Delete record with id " + id
    }
    async create(userData: UserDto) {
        const databaseResponse = await this.databaseService.runQuery(
            `
      INSERT INTO users (
        id,
        name,
        email
      ) VALUES (
        $1,
        $2,
        $3
      ) RETURNING *
    `,
            [userData.id, userData.name, userData.email],
        );
        return databaseResponse.rows[0];
    }

    async update(id: number, userData: UserDto) {
        const databaseResponse = await this.databaseService.runQuery(
            `
      UPDATE users
      SET name = $2, email = $3
      WHERE id = $1
      RETURNING *
    `,
            [id, userData.name, userData.email],
        );
        const entity = databaseResponse.rows[0];
        if (!entity) {
            throw new NotFoundException();
        }
        return entity;
    }
}

export default UsersRepository;