import React from "react"
import { Projects } from "../2_widgets/projects"
import { AppBar } from "../5_shared/ui/app-bar"

const HomePage: React.FC = () => {
    return (
        <>
            <AppBar />
            <Projects />
        </>
    )
}

export default HomePage