import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { TaskEntity } from "../../tasks/entities/task.entity"
import { UserEntity } from "../../users/entities/user.entity"

@Entity('projects')
export class ProjectEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => TaskEntity, (task) => task.project)
    tasks: TaskEntity[]

    @ManyToOne(() => UserEntity, (user) => user.projects)
    user: UserEntity
}