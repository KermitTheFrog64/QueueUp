import { useNavigate } from "react-router-dom"
import { Project } from "../../types"
import { Icon } from "../icons"
import { deleteProject } from "../../../2_widgets/projects/projects-slice"
import { useAppDispatch } from "../../hooks/redux"
import './project-card.scss'
import React, { useState } from "react"
import DeleteProjectModal from "../../../2_widgets/projects/DeleteProjectModal"
import { EditProjectModal } from "../../../2_widgets/projects"
interface ProjectCardProps extends React.PropsWithChildren {
    project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        dispatch(deleteProject(project.id))
    }

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

    const handleCancelClick = () => {
        setIsDeleteModalOpen(false)
    }

    const handleClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsDeleteModalOpen(true)
    }

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        setIsEditModalOpen(true)
    }

    return (
        <div>
            <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="project-card"
            >
                <div className="project-name">
                    {project.name}
                </div>

                <div className="icons-container">
                    <Icon name="edit" onClick={handleEditClick} size={30} />
                    <Icon name='delete' onClick={handleClick} size={30} />
                </div>
            </div>

            {isDeleteModalOpen && <DeleteProjectModal
                setIsModalOpen={setIsDeleteModalOpen}
                onCancelClick={handleCancelClick}
                onDeleteClick={handleDeleteClick}
            />}

            {isEditModalOpen && <EditProjectModal
                id={project.id}
                name={project.name}
                setIsModalOpen={setIsEditModalOpen}
            />}
        </div>
    )
}

export default ProjectCard