import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";
import { getCustomRepository, Repository } from "typeorm";



class UsersService {
    private usersRepository: Repository<User>

    constructor() {
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string) {
        // Verificar se o usuário existe

        const userExists = await this.usersRepository.findOne({
            email
        });

        // Se existir, retornar user
        if(userExists){
            return userExists;
        }

        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);
        // Se não existir, salvar no Banco de Dados
        return user;
    }

}

export{ UsersService };