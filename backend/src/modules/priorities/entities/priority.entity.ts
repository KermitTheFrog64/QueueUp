import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm"
import { TaskEntity } from "../../tasks/entities/task.entity"

@Entity('priorities')
export class PriorityEntity {
    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    color: string

    @OneToMany(() => TaskEntity, (task) => task.priority)
    tasks: TaskEntity[]
}