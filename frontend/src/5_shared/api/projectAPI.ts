import { fetchData } from "."
import { CreateTaskPayload, Project, Reordertask3Payload, Task } from "../types"

export const fetchCurrentProjectRequest = (id: number) => {
    return fetchData<number, Project>({
        path: `/projects/${id}`, method: 'GET'
    })
}

export const reorderTasksInColumn = (id: number, idAray: number[]) => {
    return fetchData<number[]>({
        path: `/tasks/${id}/reorderInColumn`, method: 'PUT', payload: idAray
    })
}

export const reorderTasksBetweenColumn = (taskId: number, payload: Reordertask3Payload) => {
    return fetchData<Reordertask3Payload>({
        path: `/tasks/${taskId}/reorderBetweenColumn`, method: 'PUT', payload
    })
}

export const createTaskRequest = (id: number, payload: CreateTaskPayload) => {
    return fetchData<CreateTaskPayload, Task>({
        path: `/tasks/${id}`, method: 'POST', payload
    })
}

export const deleteEndedTasksRequest = (projectId: number) => {
    return fetchData<number, number[]>({
        path: `/tasks/${projectId}/endedTasks`, method: 'DELETE'
    })
}