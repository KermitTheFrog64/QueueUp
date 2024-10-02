import { Repository } from "typeorm";
import { PriorityEntity } from "./entities/priority.entity";
import { AppDataSource } from "../../data-source";

class PrioritiesService {

    private prioritiesRepository: Repository<PriorityEntity> = AppDataSource.getRepository(PriorityEntity)

    async getPriorities () {
        return await this.prioritiesRepository.find()
    }

    async findById (id: number) {
        return await this.prioritiesRepository.findOneBy({id})
    }
}

export default PrioritiesService