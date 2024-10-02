import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../5_shared/hooks/redux"
import { fetchProjects, getProjects } from "./projects-slice"
import { Icon } from "../../5_shared/ui/icons"
import { AddProjectModal } from "."
import { Project } from "../../5_shared/types"
import { getUser } from "../authorization/auth-slice"
import { Error } from "../../5_shared/ui/error"
import './projects.scss'
import ProjectCard from "../../5_shared/ui/project-card/ProjectCard"

const Projects: React.FC = () => {

    const dispatch = useAppDispatch()

    const user = useAppSelector(getUser)

    useEffect(() => {
        user && dispatch(fetchProjects())
    }, [user])

    const projects = useAppSelector(getProjects)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const handleAddProjectClick = () => {
        setIsModalOpen(true)
    }

    if (!Array.isArray(projects)) {
        return (
            <Error name="Projects are unavailable" />
        )
    }

    return (
        <div>
            <div className="projects-list-container">
                {
                    projects.map((p: Project) =>
                        <ProjectCard project={p} key={p.id} />)
                }
            </div>

            <div className="add-icon">
                <Icon name="add_circle" onClick={handleAddProjectClick} size={30} />
            </div>

            {isModalOpen && user && <AddProjectModal setIsModalOpen={setIsModalOpen} />}
        </div>
    )
}



export default Projects