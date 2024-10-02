import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProjectEntity } from "../../projects/entities/project.entity";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: false})
    name: string

    @Column()
    phoneNumber: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    password: string

    @OneToMany(() => ProjectEntity, (project) => project.user)
    projects: ProjectEntity[]
}