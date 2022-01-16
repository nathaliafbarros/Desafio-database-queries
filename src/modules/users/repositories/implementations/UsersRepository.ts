import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    // Complete usando ORM
    // Esse método deve receber o Id de um usuário e retornar os dados do usuário encontrado 
    // juntamente com os dados de todos os games que esse usuário possui.
    const user = await this.repository.findOne(user_id, {relations: ['games']});
    
    if(!user){
      throw new Error('User does not exists');
    }
    
    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    // Esse método deve retornar a listagem de usuários cadastrados em ordem alfabética (ASC).
    return await this.repository.query(`SELECT * FROM users ORDER BY first_name ASC`); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
     // Complete usando raw query
     // Esse método deve receber `first_name` e `last_name` e retornar um usuário
     // que possua os mesmos `first_name` e `last_name`. 
     // Deve ser ignorado se o argumento passado está em caixa alta ou não. (Usar LOWER - tudo caixa baixa)
    return await this.repository.query(`
      SELECT * 
      FROM users 
      WHERE LOWER(first_name) = LOWER('${first_name}') AND LOWER(last_name) = LOWER('${last_name}')`);
  }
}
