import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Status, Project, Task } from "../../5_shared/types"
import { AppState } from "../../0_app/store"
import { deleteEndedTasksRequest, fetchCurrentProjectRequest, reorderTasksInColumn, reorderTasksBetweenColumn } from "../../5_shared/api/projectAPI"
import { ResponseOptions } from "../../5_shared/api"

interface InitialState {
    project: Project | null
    statuses: Status[]
}

const initialState: InitialState = {
    project: null,
    statuses: []
}

export const fetchCurrentProject = createAsyncThunk('board/get', async (id: number) => {
    return await fetchCurrentProjectRequest(id)
})

export const reorderTasks2 = createAsyncThunk('board/put', async (thunkAPI) => {

    //@ts-ignore
    const state: AppState = thunkAPI.getState()

    if (state.project?.project?.tasks) {
        const idArray = state.project.project.tasks.map(task => task.id)
        return await reorderTasksInColumn(state.project.project.id, idArray)
    }

    return null

})

export const reorderTasks3 = createAsyncThunk('board2/put', async (result: any) => {

    const { draggableId, source, destination } = result

    if (source.droppableId !== destination.droppableId) {
        return await reorderTasksBetweenColumn(draggableId, { statusName: destination.droppableId })
    }

    return null

})

export const deleteEndedTasks = createAsyncThunk('board/delete', async (id: number) => {
    return await deleteEndedTasksRequest(id)
})

const projectSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        reorderTasks: (state, action) => {

            const { draggableId, source, destination } = action.payload

            if (source && destination && state?.project && state.project?.tasks) {

                const { tasks } = state.project

                const columns = {
                    queue: tasks?.filter((task) => task.status?.name === 'queue'),
                    dev: tasks?.filter((task) => task.status?.name === 'dev'),
                    done: tasks?.filter((task) => task.status?.name === 'done')
                }

                const findTask = tasks.find(task => task.id === Number(draggableId))

                if (source.droppableId !== destination.droppableId && findTask) {
                    if (destination.droppableId === 'queue') {
                        findTask.status = { id: 1, name: 'queue' }
                    }
                    if (destination.droppableId === 'dev') {
                        findTask.status = { id: 2, name: 'dev' }
                    }
                    if (destination.droppableId === 'done') {
                        findTask.status = { id: 3, name: 'done' }
                    }
                }

                // @ts-ignore
                columns[source.droppableId].splice(source.index, 1)

                // @ts-ignore
                columns[destination.droppableId].splice(destination.index, 0, findTask)

                state.project.tasks = Object.values(columns).flat()

                state.project.tasks.forEach((task, index) => {
                    task.order = index
                });
            }

        },
        updateTaskHeader: (state, { payload }: PayloadAction<Pick<Task, 'id' | 'name'>>) => {
            if (state.project?.tasks) {
                const findTask = state.project.tasks?.find((item) => item.id === payload.id)
                if (findTask) {
                    findTask.name = payload.name
                }
            }
        },
        addTask: (state, { payload }: PayloadAction<Task>) => {
            state.project?.tasks?.unshift(payload)
        },
        updateTasks: (state, { payload }: PayloadAction<number>) => {
            if (state.project?.tasks) {
                state.project.tasks = state.project?.tasks?.filter((task) => task.id !== payload)
            }
        },
        updateTaskPriority: (state, { payload }: PayloadAction<Pick<Task, 'id' | 'priority'>>) => {
            const findTask = state.project?.tasks?.find((task) => task.id === payload.id)

            if (findTask) {
                findTask.priority = payload.priority
            }
        },
        updateTaskDescription: (state, { payload }: PayloadAction<Pick<Task, 'id' | 'description'>>) => {
            if (state.project?.tasks) {
                const findTask = state.project.tasks.find((item) => item.id === payload.id)
                if (findTask) {
                    findTask.description = payload.description
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentProject.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<Project>>) => {
                if (payload?.data) {
                    state.project = payload.data
                } else {
                    state.project = null
                }
            })
            .addCase(deleteEndedTasks.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<number[]>>) => {
                if (state.project?.tasks && payload?.data) {
                    state.project.tasks = state.project.tasks.filter((task) => !payload?.data?.includes(task.id))
                }
            })
    }
})

export const getCurrentProject = (state: AppState) => state.project.project

export const {
    reorderTasks,
    updateTaskHeader,
    addTask,
    updateTasks,
    updateTaskPriority,
    updateTaskDescription
} = projectSlice.actions

export default projectSlice.reducer
