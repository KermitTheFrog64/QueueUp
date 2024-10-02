import React, { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import { updateTaskHeader } from "../../2_widgets/project/project-slice"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTaskRequest } from "../../5_shared/api/taskAPI"
import { useDebounceValue } from "usehooks-ts"
import useSkipFirstEffect from "../../5_shared/hooks/use-skip-first-use-effect"
import Input from "../../5_shared/ui/input/Input"

interface TaskHeaderProps {
    name: string
    id: number
}

const TaskHeader: React.FC<TaskHeaderProps> = (props) => {

    const dispatch = useAppDispatch()

    const [debounceName, setName] = useDebounceValue(props.name, 1000)

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => updateTaskRequest(props.id, { name: debounceName }),
        onSuccess: () => {
            dispatch(updateTaskHeader({ id: props.id, name: debounceName }))
            queryClient.invalidateQueries({ queryKey: ['tasks', props.id] })
        }
    })

    useSkipFirstEffect(() => {
        mutate()
    }, [debounceName])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setName(name)        
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

    const onEnterDown = (event: any) => {
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
                        placeholder="Header"
                        defaultValue={props.name}
                        onChange={handleInputChange}
                        required
                        onKeyDown={onEnterDown}
                    />
                </div>
                : <span onClick={() => setIsEditing(true)} >
                    {props.name}
                </span>}
        </div>
    )
}

export default TaskHeader