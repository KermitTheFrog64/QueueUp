import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { ProjectEntity } from "../../projects/entities/project.entity"
import { CommentEntity } from "../../comments/entities/comment.entity"
import { SubtaskEntity } from "../../subtasks/entities/subtask.entity"
import { FileEntity } from "../../files/entities/file.entity"
import { PriorityEntity } from "../../priorities/entities/priority.entity"
import { StatusEntity } from "../../statuses/entities/status.entity"
import { UserEntity } from "../../users/entities/user.entity"

@Entity( 'tasks' )
export class TaskEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ default: null })
    name: string

    @Column({
        default: null,
        length: 1000
    })
    description: string

    @Column({ default: null })
    dateCreated: string

    @Column({ default: null })
    timeInProgress: string

    @Column({ default: null })
    dateCompleted: string

    @Column({ default: null })
    order: number

    @ManyToOne(() => ProjectEntity, (project) => project.tasks, {onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    project: ProjectEntity

    @ManyToOne(() => StatusEntity, (status) => status.tasks)
    status: StatusEntity

    @Column({ default: null })
    priority_id: number
    @ManyToOne(() => PriorityEntity, {onDelete: 'SET NULL', onUpdate: 'CASCADE'})
    @JoinColumn({name: 'priority_id'})
    priority: PriorityEntity

    @OneToMany(() => CommentEntity, (comment) => comment.task)
    comments: CommentEntity[]

    @OneToMany(() => SubtaskEntity, (subtask) => subtask.task)
    @JoinColumn()
    subtasks: SubtaskEntity[]

    @OneToMany(() => FileEntity, (file) => file.task)
    files: FileEntity[]
    taskToUpdate: { id: number; name: string }
}