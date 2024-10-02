import { fetchData } from "."
import { Priority, Task, UpdateTaskPayload } from "../types"

export const fetchCurrentTaskRequest = (id: number) => {
    return fetchData<any, Task>({
        path: `/tasks/${id}`, method: 'GET'
    })
}

export const fetchPrioritiesRequest = () => {
    return fetchData<any, Priority[]>({
        path: `/priorities/`, method: 'GET'
    })
}

export const updateTaskRequest = (id: number, payload: UpdateTaskPayload) => {  
    return fetchData<UpdateTaskPayload, Task>({
        path: `/tasks/${id}`, method: 'PUT', payload
    })
}

export const deleteTaskByIdRequest = (id: number) => {
    return fetchData<number, Task>({
        path: `/tasks/${id}`, method: 'DELETE'
    })
}
