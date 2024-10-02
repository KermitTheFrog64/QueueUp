import { Task } from "../../5_shared/types"

const filteredColumn = (filter: string, tasks: Task[], search: string) => {

    const column = tasks.filter((task) => task.status?.name === filter)

    const filteredcolumn = column?.filter((task) => task.name.includes(search))
    
    if (search === '') {
        return column
    }
    else {
        return filteredcolumn
    }
}

export default filteredColumn