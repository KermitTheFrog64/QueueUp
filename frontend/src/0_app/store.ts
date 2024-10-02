import {configureStore} from '@reduxjs/toolkit'
import { projectSlice } from '../2_widgets/project'
import { projectsSlice } from '../2_widgets/projects'
import { subtaskSlice } from '../2_widgets/subtasks'
import { authSlice } from '../2_widgets/authorization'



const store = configureStore({
    reducer: {
        project: projectSlice,
        projects: projectsSlice,
        subtask: subtaskSlice,
        auth: authSlice
    }
})

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store