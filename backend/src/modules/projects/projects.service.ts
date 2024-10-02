import { Repository } from "typeorm";
import { ProjectEntity } from "./entities/project.entity";
import { AppDataSource } from "../../data-source";
import { UserEntity } from "../users/entities/user.entity";

class ProjectsService {

    private projectsRepository: Repository<ProjectEntity> = AppDataSource.getRepository(ProjectEntity)

    async getProjects(userId: number) {
        return await this.projectsRepository.find({
            relations: {
                user: true
            },
            where: {
                user: {
                    id: userId
                }
            }
        })
    }

    private usersRepository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity)


    async createProject (id: number, name: string) {
        const newProject = await this.projectsRepository.create({ name })
        const user = await this.usersRepository.findOneBy({id})        
        newProject.user = user        
        return await this.projectsRepository.save(newProject)
    }

    async getProjectById (projectId: number, userId: number) {
        
        return await this.projectsRepository.findOne({
            where: {
                id: projectId,
                user: {
                    id: userId
                }
            },
            relations: [
                'tasks',
                'tasks.status',
                'user',
                'tasks.priority'
            ],
            order: {
                tasks: {
                    order: 'ASC'
                }
            }
        })
    }

    async deleteProject(id: number) {
        const projectToDelete = await this.projectsRepository.findOneBy({ id })
        await this.projectsRepository.delete({ id })
        return projectToDelete
    }

    async updateProjectName (id: number, name: string) {
        const project = await this.projectsRepository.findOneBy({id})
        if (project) {
            await this.projectsRepository.update(id, {name})
        }
    }
}

export default ProjectsService