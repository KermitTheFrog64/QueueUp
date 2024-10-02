import { fetchData } from "."
import { Project } from "../types"

export interface CreateProjectPayload {
    name: string
}

export interface updateProjectPayload {
    name: string
}

export const fetchProjectsRequest = () => {
    return fetchData<Project[]>({
        path: `/projects`, method: 'GET'
    })
}

export const createProjectRequest = (payload: CreateProjectPayload) => {
    return fetchData<CreateProjectPayload, Project>({
        path: `/projects`, method: 'POST', payload
    })
}

export const deleteProjectRequest = (id: number) => {
    return fetchData<string, Project>({
        path: `/projects/${id}`, method: 'DELETE'
    })
}

export const updateProjectNameRequest = (id: number, name: string) => {    
    return fetchData<updateProjectPayload, Project>({
        path: `/projects/${id}`, method: 'PUT', payload: {name}
    })
}