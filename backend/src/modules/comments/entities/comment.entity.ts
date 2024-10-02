import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TaskEntity } from "../../tasks/entities/task.entity"

@Entity('comments')
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 1000
    })
    content: string

    @ManyToOne(() => TaskEntity, (task) => task.comments)
    task: TaskEntity
}