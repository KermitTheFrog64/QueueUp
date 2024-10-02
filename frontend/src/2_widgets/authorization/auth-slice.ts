import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../0_app/store"
import {isAuthenticatedRequest, logInRequest, signUpRequest } from "../../5_shared/api/authAPI"
import { LogInPayload, LogInResponse, SignUpPayload, SignUpResponse, User } from "../../5_shared/types"
import { ResponseOptions } from "../../5_shared/api"

interface InitialState {
    user: User | null
    access_token: string | null
}

const initialState: InitialState = {
    user: null,
    access_token: localStorage.getItem('access_token')
}

export const logIn = createAsyncThunk(
    "auth/logIn", async (payload: LogInPayload) => await logInRequest(payload)
)

export const signUp = createAsyncThunk(
    "auth/signUp", async (payload: SignUpPayload) => await signUpRequest(payload)
)

export const isAuthenticated = createAsyncThunk(
    'auth/isAuth', async () => await isAuthenticatedRequest()
)

export const authSlice = createSlice({
    name: 'subtask',
    initialState,
    reducers: {
        logOut(state) {
            localStorage.removeItem('access_token')
            state.user = null
            state.access_token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state,
                { payload }: PayloadAction<ResponseOptions<LogInResponse>>) => {
                if (payload?.data?.access_token) {
                    state.access_token = payload.data.access_token
                    localStorage.setItem('access_token', payload.data.access_token)
                }
            })
            .addCase(signUp.fulfilled, (state,
                { payload }: PayloadAction<ResponseOptions<SignUpResponse>>) => {
                if (payload?.data?.access_token) {
                    state.access_token = payload.data.access_token
                    localStorage.setItem('access_token', payload.data.access_token)
                }
            })
            .addCase(isAuthenticated.fulfilled, (state, 
                { payload }: PayloadAction<ResponseOptions<User>>) => {
                if (payload?.data?.id) {
                    state.user = payload.data
                }
                else {
                    localStorage.removeItem('access_token')
                    state.access_token = null
                }
            })

    }
})

export const getAccessToken = (state: AppState) => state.auth.access_token

export const getUser = (state: AppState) => state.auth.user

export const { logOut } = authSlice.actions

export default authSlice.reducer