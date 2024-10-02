import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Project } from "../../5_shared/types";
import { AppState } from "../../0_app/store";
import { createProjectRequest, deleteProjectRequest, fetchProjectsRequest } from "../../5_shared/api/projectsAPI";
import { ResponseOptions } from "../../5_shared/api";

interface InitialState {
    projects: Project[]
}

const initialState: InitialState = {
    projects: []
}

export const fetchProjects = createAsyncThunk('projects/getProjects', async () => {
    return await fetchProjectsRequest()
})

export const createProject = createAsyncThunk('projects/post', async (name: string) => {
    return await createProjectRequest({ name })
})

export const deleteProject = createAsyncThunk('subtask/delete', async (id: number) => {
    return await deleteProjectRequest(id)
})



const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        updateProjectName: (state, { payload }: PayloadAction<Pick<Project, 'id' | 'name'>>) => {
            if (state.projects) {
                const findProject = state.projects.find((item) => item.id === payload.id)
                if (findProject) {
                    findProject.name = payload.name
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<Project[]>>) => {
                if (Array.isArray(payload.data)) {
                    state.projects = payload.data
                }
            })
            .addCase(createProject.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<Project>>) => {
                console.log(payload);

                if (payload?.data) {
                    state.projects.push(payload.data)
                }
            })
            .addCase(deleteProject.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<Project>>) => {
                if (payload?.data) {
                    state.projects = state.projects.filter((item) => item.id !== payload?.data?.id)
                }
            })
    }
})

export const getProjects = (state: AppState) => state.projects.projects

export const { updateProjectName } = projectsSlice.actions

export default projectsSlice.reducer