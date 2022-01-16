import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    // Complete usando query builder
    // Esse método deve receber parte do título de um jogo ou o título inteiro
    // e retornar um ou mais jogos que derem match com a consulta. 
    return await this.repository.createQueryBuilder("game")
    .where("game.title ILIKE :title", {title: `%${param}%`})
    .getMany();
  }

  async countAllGames(): Promise<[{ count: string }]> {
    // Complete usando raw query
    // Esse método deve retornar uma contagem do total de games existentes no banco
    return await this.repository.query(`SELECT COUNT(id) FROM games`); 
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    // Complete usando query builder
    // Esse método deve receber o Id de um game e retornar uma lista de todos os usuários 
    // que possuem o game do Id informado. 
    return this.repository.createQueryBuilder()
    .relation(Game, "users")
    .of(id)
    .loadMany()
  }
}
