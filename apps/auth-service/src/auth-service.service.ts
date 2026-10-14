import { IUser, LoginUserPayload, RegisterUserPayload } from '@app/contracts';
import { RpcConflictError } from '@app/contracts/filters';
import { RpcBadRequest } from '@app/contracts/filters/bad-request.filter';
import { RpcNotFound } from '@app/contracts/filters/not-found.filter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthServiceService {
  private readonly users: IUser[] = [];
  private nextId = 0;

  findOne(id: number) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new RpcNotFound(`User ${id} not found`);
    return user;
  }

  register(dto: RegisterUserPayload) {
    const exist = this.users.find((u) => dto.username === u.username);

    if (exist) throw new RpcConflictError(`User ${dto.username} already exist`);

    this.users.push({
      id: ++this.nextId,
      ...dto,
    });

    return dto;
  }

  login(dto: LoginUserPayload) {
    const user = this.users.find(
      (u) => dto.username === u.username && dto.password === u.password,
    );

    if (!user) throw new RpcBadRequest(`username or password is not correct`);
    return user;
  }
}
