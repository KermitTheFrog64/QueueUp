import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SubTask } from "../../5_shared/types";
import { addSubtasksRequest, fetchSubtasksRequest } from "../../5_shared/api/subtaskAPI";
import { ResponseOptions } from "../../5_shared/api";
import { AppState } from "../../0_app/store";

interface InitialState {
    subtasks: SubTask[]
}

const initialState: InitialState = {
    subtasks: []
}

export const fetchSubtasks = createAsyncThunk('subtasks/get', async (id: number) => {
    return await fetchSubtasksRequest(id)
})

export const addSubtask = createAsyncThunk('subtask/post', async ({ taskId, name }: { taskId: number, name: string }) => {
    return await addSubtasksRequest(taskId, { name })
})

export const subtaskSlice = createSlice({
    name: 'subtask',
    initialState,
    reducers: {
        updateSubtask: (state, { payload }: PayloadAction<Pick<SubTask, 'id' | 'name'>>) => {            
            if (state.subtasks) {
                const findSubtask = state.subtasks.find((item) => item.id === payload.id)
                if (findSubtask) {
                    findSubtask.name = payload.name
                }
            }
        },
        toggleSubtask: (state, {payload}: PayloadAction<Pick<SubTask, 'id'>>) => {     
            if (state.subtasks) {
                const findSubtask = state.subtasks.find((item) => item.id === payload.id) 
                if (findSubtask) {
                    findSubtask.isEnded = !findSubtask.isEnded                    
                }
            }
        },
        deleteSubtask: (state, {payload}: PayloadAction<Pick<SubTask, 'id'>>) => {
            if (state.subtasks) {
                state.subtasks = state.subtasks.filter((item) => item.id !== payload.id)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSubtasks.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<SubTask[]>>) => {
                if (payload.data) {
                    state.subtasks = payload.data
                }
            })
            .addCase(addSubtask.fulfilled, (state, { payload }: PayloadAction<ResponseOptions<SubTask>>) => {
                if (payload.data) {
                    state.subtasks.push(payload.data)
                }
            })
    }
})

export const getSubtasks = (state: AppState) => state.subtask.subtasks

export const { toggleSubtask, deleteSubtask, updateSubtask } = subtaskSlice.actions

export default subtaskSlice.reducer