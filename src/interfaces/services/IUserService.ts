/* eslint-disable no-unused-vars */
import { IUser } from "../models/IUser";

// Funções para fazer comunicação com o BD

// Pick => Pega as informações obrigatórias para salvar
// Omit => Pega tudo, menos o que eu passar pra ele

export interface IUserService {
  findByEmail(email: IUser["email"]): Promise<IUser>;
  findByPk(id: IUser["id"]): Promise<IUser>;
  getAll(): Promise<IUser[]>;
  update(id: number, data: IUser): Promise<IUser>;
  destroy(id: number): Promise<void>;
  store(
    data: Pick<IUser, "name" | "username" | "email" | "phone" | "password">
  ): Promise<IUser>;
}
