import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TaskEntity } from "../../tasks/entities/task.entity"

@Entity('subtasks')
export class SubtaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column('boolean', {default: false})
    isEnded: boolean = false

    @ManyToOne(() => TaskEntity, (task) => task.subtasks, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    task: TaskEntity
}