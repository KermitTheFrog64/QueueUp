import { In, Repository } from "typeorm"
import { TaskEntity } from "./entities/task.entity"
import { AppDataSource } from "../../data-source"
import { PriorityEntity } from "../priorities/entities/priority.entity"
import { StatusEntity } from "../statuses/entities/status.entity"
import { ProjectEntity } from "../projects/entities/project.entity"

import dayjs from 'dayjs'
import { UpdateTaskPayload } from "./dto/update-task.dto"

class TasksService {

    private tasksRepository: Repository<TaskEntity> = AppDataSource.getRepository(TaskEntity)

    async getCurrentTask(id: number) {
        return await this.tasksRepository.findOne({
            where: {
                id
            },
            relations: [
                'status',
                'priority'
            ]
        })
    }

    async findTaskById(id: number) {
        return await this.tasksRepository.findOne({
            where: {
                id
            },
            relations: {
                project: true,
                status: true,
                priority: true
            }
        })
    }

    async updateTask (id: number, payload: UpdateTaskPayload) {
        const task = await this.tasksRepository.findOneBy({ id })
        if(task) {
            await this.tasksRepository.update({id}, payload)
            return await this.findTaskById(id)
        }
        return null
    }

    async reorderTasksInColumn(id: number, idArray: number[]) {
        const tasks = await this.tasksRepository.find({
            relations: {
                project: true
            },
            where: {
                project: {
                    id
                }
            },
            order: {
                order: 'ASC'
            }
        })

        idArray.forEach((taskId, index) => {
            const taskToUpdate = tasks.find((task) => task.id === taskId)
            if (taskToUpdate) {
                taskToUpdate.order = index
            }
        })

        return await this.tasksRepository.save(tasks)
    }

    private statusRepository: Repository<StatusEntity> = AppDataSource.getRepository(StatusEntity)

    async reorderTasksBetweenColumn(id: number, name: string) {

        const taskToUpdate = await this.tasksRepository.findOneBy({ id })

        const statusToUpdate = await this.statusRepository.findOne({
            where: {
                name
            }
        })

        taskToUpdate.status = statusToUpdate

        if (statusToUpdate.id === 3) {
            taskToUpdate.dateCompleted = dayjs().format('YYYY-MM-DD HH:mm:ss')
        }

        return await this.tasksRepository.save(taskToUpdate)
    }

    async deleteEndedTasks(id: number) {
        const tasksToDelete = await this.tasksRepository.find({
            relations: {
                project: true,
                status: true
            },
            where: {
                project: {
                    id
                },
                status: {
                    id: 3
                }
            }
        })

        let idArray: number[] = tasksToDelete.map((task) => task.id)

        await this.tasksRepository.delete({ id: In(idArray) })

        return idArray
    }

    async deleteTaskById(id: number) {
        const taskToDelete = await this.tasksRepository.findOne({
            relations: {
                project: true,
                status: true
            },
            where: { id }
        })
        console.log(taskToDelete)
        await this.tasksRepository.delete({ id })
        return taskToDelete
    }

    private projectsRepository: Repository<ProjectEntity> = AppDataSource.getRepository(ProjectEntity)

    private priorityRepository: Repository<PriorityEntity> = AppDataSource.getRepository(PriorityEntity)

    async createTask(id: number, name: string) {
        const newTask = await this.tasksRepository.create({ name })
        //const projectsService = new ProjectsService()
        const project = await this.projectsRepository.findOneBy({ id })
        newTask.project = project
        const status = await this.statusRepository.findOneBy({ id: 1 })
        newTask.status = status
        const priority = await this.priorityRepository.findOneBy({ id: 4 })
        newTask.priority = priority
        newTask.dateCreated = dayjs().format('YYYY-MM-DD HH:mm:ss')
        return await this.tasksRepository.save(newTask)
    }
}

export default TasksService