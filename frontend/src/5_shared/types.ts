export interface SubTask {
    isEnded: boolean
    id: number
    name: string
}

export interface TaskFile {
    id: number
    name: string
    url: string
}

export interface TaskComment {
    id: number
    text: string
    comments: TaskComment[]
}

export type PriorityType = 'none' | 'low' | 'medium' | 'high' | ''

export interface Priority {
    id: number
    name: PriorityType
    color: string
}

export interface Status {
    id: number
    name: string
}

export interface Task {
    id: number
    name: string
    description?: string
    dateCreated: string
    timeInProgress?: string
    dateCompleted?: string
    priority: Priority | null
    files?: TaskFile[]
    subtasks?: SubTask[]
    comments?: TaskComment[]
    status: Status
    order: number
}

export interface Project {
    id: number
    name: string
    tasks?: Task[]
}

// AUTHORIZATION

export interface LogInPayload {
    email: string
    password: string
}

export interface SignUpPayload extends LogInPayload {
    name: string
    phoneNumber: string
    passwordConfirmation?: string
}

export interface LogInResponse {
    access_token: string
}

export interface SignUpResponse extends LogInResponse {

}

export interface User {
    id: number
    name: string
}

////////////////////////////////

export interface ReorderTasks2Payload {
    id: number
    idAray: number[]
}

export interface AddSubtaskPayload {
    name: string
}

export interface UpdatePriorityPayload {
    id: number
    priority: Priority
}

export interface UpdateDescriptionPayload {
    id: number
    description: string
}

export interface UpdateHeaderPayload {
    id: number
    name: string
}

export interface UpdateTaskPayload {
    name?: string
    description?: string
    priority_id?: number | null
}

export interface UpdateSubtaskPayload {
    name: string
}

export interface CreateTaskPayload{
    name: string
}

export interface Reordertask3Payload {
    statusName: string
}