import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, AppState } from "../../0_app/store"


// export const useAppDispatch: () => AppDispatch = useDispatch
// export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector