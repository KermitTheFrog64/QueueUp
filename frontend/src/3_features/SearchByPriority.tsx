import { useState } from "react"
import './search.scss'
import PrioritySelection, { Option } from "../5_shared/ui/priority/PrioritySelection"

interface SearchByPriorityPayload extends React.HTMLAttributes<HTMLDivElement> {
    setSearchByPriority: (priority: number) => void
}

const SearchByPriority: React.FC<SearchByPriorityPayload> = ({ setSearchByPriority }) => {

    const [selectedPriority, setSelectedPriority] = useState<number>(4)

    const handleSearchByPriority = (id: number) => {
        setSearchByPriority(id)
    }

    const defaultValue: Option = { value: 4, label: 'all', color: '#A7ACC2' }

    return (
        <PrioritySelection
            handleSearchByPriority={handleSearchByPriority}
            selectedValue={selectedPriority}
            setSelectedValue={setSelectedPriority}
            defaultValue={defaultValue}
            width="150px"
        />
    )
}

export default SearchByPriority