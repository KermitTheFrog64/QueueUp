import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { TaskEntity } from "../../tasks/entities/task.entity"

@Entity('files')
export class FileEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    path: string

    @Column({
        length: 50
    })
    type: string

    @ManyToOne(() => TaskEntity, (task) => task.files)
    task: TaskEntity
}