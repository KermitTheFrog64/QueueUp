import "reflect-metadata"
import { DataSource } from "typeorm"

import { TaskEntity } from "./modules/tasks/entities/task.entity"
import { PriorityEntity } from "./modules/priorities/entities/priority.entity"
import { ProjectEntity } from "./modules/projects/entities/project.entity"
import { StatusEntity } from "./modules/statuses/entities/status.entity"
import { SubtaskEntity } from "./modules/subtasks/entities/subtask.entity"
import { CommentEntity } from "./modules/comments/entities/comment.entity"
import { FileEntity } from "./modules/files/entities/file.entity"
import { UserEntity } from "./modules/users/entities/user.entity"

export const AppDataSource = new DataSource({
    type: "postgres",
    url: "postgresql://queueupdb_user:RKHlygYT5wq2lewjLUqDIx00G9pFi7yy@dpg-cs40hgtsvqrc73c9f3h0-a/queueupdb",
    host: "dpg-cs40hgtsvqrc73c9f3h0-a",
    port: 5432,
    username: "queueupdb_user",
    password: "RKHlygYT5wq2lewjLUqDIx00G9pFi7yy",
    database: "QueueUpDB",
    synchronize: false,
    logging: false,
    entities: [
        CommentEntity, FileEntity, PriorityEntity, ProjectEntity, StatusEntity, SubtaskEntity, TaskEntity, UserEntity
    ],
    // migrations: [],
    // subscribers: [],

})
