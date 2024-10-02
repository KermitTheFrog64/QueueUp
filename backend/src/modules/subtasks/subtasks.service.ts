import { Repository } from "typeorm";
import { SubtaskEntity } from "./entities/subtask.entity";
import { AppDataSource } from "../../data-source";
import { TaskEntity } from "../tasks/entities/task.entity";
import { log } from "console";

class SubtasksService {

    private subtasksRepository: Repository<SubtaskEntity> = AppDataSource.getRepository(SubtaskEntity)

    async getSubtasks(taskId: number) {
        return await this.subtasksRepository.find({
            relations: {
                task: true
            },
            where: {
                task: {
                    id: taskId
                }
            }
        })
    }

    async toggleSubtask(id: number) {
        const subtaskToToggle = await this.subtasksRepository.findOneBy({ id })        
        subtaskToToggle.isEnded = !subtaskToToggle.isEnded
        return await this.subtasksRepository.save(subtaskToToggle)
    }

    private taskRepository: Repository<TaskEntity> = AppDataSource.getRepository(TaskEntity)

    async addSubtask(id: number, name: string) {
        const newSubtask = await this.subtasksRepository.create({ name })
        const taskToUpdate = await this.taskRepository.findOneBy({ id })
        newSubtask.task = taskToUpdate
        return await this.subtasksRepository.save(newSubtask)
    }

    async deleteSubtask(id: number) {
        const subtaskToDelete = await this.subtasksRepository.findOneBy({ id })
        await this.subtasksRepository.delete({ id })
        return subtaskToDelete
    }

    async updateSubtask(id: number, name: string) {
        const subtask = await this.subtasksRepository.findOneBy({ id })
        if (subtask) {
            await this.subtasksRepository.update(id, { name })
        }
    }
}

export default SubtasksService