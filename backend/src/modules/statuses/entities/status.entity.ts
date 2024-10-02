import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { TaskEntity } from "../../tasks/entities/task.entity"

@Entity('statuses')
export class StatusEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => TaskEntity, (task) => task.status)
    tasks: TaskEntity[]
}