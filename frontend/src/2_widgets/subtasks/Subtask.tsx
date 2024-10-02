import { useEffect, useRef, useState } from "react"
import { SubTask } from "../../5_shared/types"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import { deleteSubtask, toggleSubtask, updateSubtask } from "./subtask-slice"
import { Icon } from "../../5_shared/ui/icons"
import Input from "../../5_shared/ui/input/Input"
import { useDebounceValue } from "usehooks-ts"
import { useMutation } from "@tanstack/react-query"
import { deleteSubtaskRequest, toggleSubtasksRequest, updateSubtaskRequest } from "../../5_shared/api/subtaskAPI"
import useSkipFirstEffect from "../../5_shared/hooks/use-skip-first-use-effect"

interface SubtaskProps {
    item: SubTask
}

const Subtask: React.FC<SubtaskProps> = ({ item }) => {

    const dispatch = useAppDispatch()

    /////////////////////////////////////////////////////

    const { mutate: toggleSubtaskMutate } = useMutation({
        mutationFn: () => toggleSubtasksRequest(item.id),
        onSuccess: () => {
            dispatch(toggleSubtask({ id: item.id }))            
        }
    })

    const handleCheckboxClick = () => {
        toggleSubtaskMutate()
    }

    //////////////////////////////////////////////////////

    const { mutate: deleteSubtaskMutate } = useMutation({
        mutationFn: () => deleteSubtaskRequest(item.id),
        onSuccess: () => {
            dispatch(deleteSubtask({ id: item.id }))
        }
    })

    const handleDeleteClick = (event: React.MouseEvent) => {
        event.stopPropagation()
        deleteSubtaskMutate()
    }

    /////////////////////////////////////////////////////

    const [debounceName, setDebounceName] = useDebounceValue(item.name, 1000)

    const { mutate: updateSubtaskMutate } = useMutation({
        mutationFn: () => updateSubtaskRequest(item.id, debounceName),
        onSuccess: () => {            
            dispatch(updateSubtask({ id: item.id, name: debounceName }))
        }
    })

    useSkipFirstEffect(() => {
        updateSubtaskMutate()
    }, [debounceName])

    const handleSubtaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDebounceName(event.target.value)
    }

    const [isEditing, setIsEditing] = useState<boolean>(false)

    const inputRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsEditing(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [inputRef])

    const onEditEnterDown = (event: any) => {
        if (event.key === 'Enter') {
            setIsEditing(false)
        }
    }

    return (
        <div>
            {isEditing ?
                <div ref={inputRef}>
                    <Input
                        type="text"
                        placeholder="Subtask"
                        defaultValue={item.name}
                        onChange={handleSubtaskChange}
                        onKeyDown={onEditEnterDown}
                    />
                </div>
                : <div className="container" >
                    <div className="input-name" >
                        <input
                            type="checkbox"
                            onChange={() => handleCheckboxClick()}
                            checked={item.isEnded}
                            className="custom-checkbox"
                        />
                        <span
                            className={`name ${item.isEnded ? 'checked' : ''}`}
                            onClick={() => setIsEditing(true)}
                        >
                            {item.name}
                        </span>
                    </div>
                    <Icon name="delete" onClick={(event) => handleDeleteClick(event)} size={25} />
                </div>}
        </div>
    )
}

export default Subtask