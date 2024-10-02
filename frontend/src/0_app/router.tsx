import {createBrowserRouter} from 'react-router-dom'
import { HomePage, ProjectPage } from '../1_pages'

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    },
    {
        path: '/projects/:projectId',
        element: <ProjectPage />
    }
])

export default router