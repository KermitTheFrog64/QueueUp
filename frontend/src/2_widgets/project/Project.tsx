import React, { useEffect, useState } from "react"
import { DragDropContext } from 'react-beautiful-dnd'
import { TasksColumn } from "../../5_shared/ui"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../5_shared/hooks/redux"
import { addTask, deleteEndedTasks, fetchCurrentProject, getCurrentProject, reorderTasks, reorderTasks2, reorderTasks3 } from "./project-slice"
import { TaskModal } from "../task"
import './project.scss'
import AddTaskModal from "./AddTaskModal"
import { Error } from "../../5_shared/ui/error"
import { SearchBar } from "../../3_features"
import { Task } from "../../5_shared/types"
import filteredColumn from "./filteredColumn"
import SearchByPriority from "../../3_features/SearchByPriority"
import filteredByPriority from "./filteredByPriority"
const Project: React.FC = () => {

    const { projectId } = useParams()

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchCurrentProject(Number(projectId)))
    }, [])

    const project = useAppSelector(getCurrentProject)

    const handleDragEnd = (result: any) => {
        dispatch(reorderTasks(result))
        dispatch(reorderTasks2())
        dispatch(reorderTasks3(result))
    }

    ////////////////////////////////////////////////////////////////////

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const [taskId, setTaskId] = useState<number>()

    const handleTaskClick = (id: number) => {
        setTaskId(id)
        setIsModalOpen(true)
    }

    /////////////////////////////////////////////////////////////////////

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

    const handleAddTaskClick = () => {
        setIsAddModalOpen(true)
    }

    /////////////////////////////////////////////////////////////////////

    const [search, setSearch] = useState<string>('')

    const [searchByPriority, setsearchByPriority] = useState<number>(4)

    /////////////////////////////////////////////////////////////////////

    if (!project) return (
        <Error name="The project is unavailable" />
    )

    const { name, tasks } = project

    let filteredQueue: Task[] = []
    let filteredDev: Task[] = []
    let filteredDone: Task[] = []

    if (tasks) {
        filteredQueue = filteredColumn('queue', tasks, search)
        filteredDev = filteredColumn('dev', tasks, search)
        filteredDone = filteredColumn('done', tasks, search)
    }

    const queue = filteredByPriority(filteredQueue, searchByPriority)
    const dev = filteredByPriority(filteredDev, searchByPriority)
    const done = filteredByPriority(filteredDone, searchByPriority)

    /////////////////////////////////////////////////////////////////////////////

    const onTaskModal = (task: Task) => {
        dispatch(addTask(task))
        dispatch(reorderTasks2())
    }

    /////////////////////////////////////////////////////////////////////////////

    const handleDeleteTasksClick = () => {
        dispatch(deleteEndedTasks(Number(projectId)))
    }

    // Получаем ссылки на элементы
    const column = document.querySelector('.dev');
    const searchBar = document.querySelector('.castom-input.search-input') as HTMLElement;

    // Функция для настройки ширины строки поиска
    function adjustSearchBarWidth() {

        if (column !== null && searchBar !== null) {
            // Получаем ширину колонки
            const columnWidth = column.clientWidth;

            // Устанавливаем ширину строки поиска равной ширине колонки
            searchBar.style.width = `${columnWidth}px`;
        }
    }

    // Вызываем функцию один раз при загрузке страницы
    adjustSearchBarWidth();

    // Добавляем слушатель события для изменения размера окна
    window.addEventListener('resize', adjustSearchBarWidth);

    return (
        <div className="project">
            <div className="header-container">
                <div className="project-name">
                    {name}
                </div>

                <div className="flex-container">

                    <SearchBar search={search} setSearch={setSearch} />

                    <SearchByPriority setSearchByPriority={setsearchByPriority} className="priority-choise" />

                </div>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="columns" >
                    <TasksColumn
                        id={'queue'}
                        name="Queue"
                        tasks={queue}
                        handleTaskClick={handleTaskClick}
                        handleAddTaskClick={handleAddTaskClick}
                    />
                    <TasksColumn
                        id={'dev'}
                        name="Development"
                        tasks={dev}
                        handleTaskClick={handleTaskClick}
                    />
                    <TasksColumn
                        id={'done'}
                        name="Done"
                        tasks={done}
                        handleTaskClick={handleTaskClick}
                        handleDeleteTasksClick={handleDeleteTasksClick}
                    />
                </div>
            </DragDropContext>


            {taskId && isModalOpen && <TaskModal setIsModalOpen={setIsModalOpen} taskId={taskId} />}

            {isAddModalOpen && <AddTaskModal
                setIsModalOpen={setIsAddModalOpen}
                projectId={Number(projectId)}
                onSave={onTaskModal}
            />}
        </div>
    )
}

export default Project