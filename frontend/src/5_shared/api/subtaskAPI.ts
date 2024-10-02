import { fetchData } from "."
import { AddSubtaskPayload, SubTask, UpdateSubtaskPayload } from "../types"

export const fetchSubtasksRequest = (taskId: number) => {
    return fetchData<number, SubTask[]>({
        path: `/subtasks/${taskId}`, method: 'GET'
    })
}

export const toggleSubtasksRequest = (subtaskId: number) => {  
    return fetchData<number, SubTask>({
        path: `/subtasks/${subtaskId}/toggle`, method: 'PUT'
    })
}

export const addSubtasksRequest = (taskId: number, payload: AddSubtaskPayload) => {
    return fetchData<any, SubTask>({
        path: `/subtasks/${taskId}`, method: 'POST', payload
    })
}

export const deleteSubtaskRequest = (id: number) => {
    return fetchData<number, SubTask>({
        path: `/subtasks/${id}`, method: 'DELETE'
    })
}

export const updateSubtaskRequest = (id: number, name: string) => {
    return fetchData<UpdateSubtaskPayload, SubTask>({
        path: `/subtasks/${id}`, method: 'PUT', payload: {name}
    })
}