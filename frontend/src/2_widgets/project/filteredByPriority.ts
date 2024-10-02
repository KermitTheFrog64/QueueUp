import { Task } from "../../5_shared/types"

const filteredByPriority = (column: Task[], searchByPriority: number) => {

    const filteredByPriorityColumn = column?.filter((task) => task.priority?.id === searchByPriority)

    if (searchByPriority === 4) {        
        return column
    } else {
        return filteredByPriorityColumn
    }
}

export default filteredByPriority