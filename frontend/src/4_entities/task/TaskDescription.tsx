import { useDebounceValue } from "usehooks-ts"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTaskRequest } from "../../5_shared/api/taskAPI"
import useSkipFirstEffect from "../../5_shared/hooks/use-skip-first-use-effect"
import { useEffect, useRef, useState } from "react"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import { updateTaskDescription } from "../../2_widgets/project/project-slice"
import parse from 'html-react-parser'
import './task.scss'

import { Editor } from '@tinymce/tinymce-react'

interface TaskDescriptionProps {
    description?: string
    id: number
}

const TaskDescription: React.FC<TaskDescriptionProps> = (props) => {

    const [debounceName, setName] = useDebounceValue(props?.description || '', 100)

    const dispatch = useAppDispatch()

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => updateTaskRequest(props.id, { description: debounceName }),
        onSuccess: () => {
            dispatch(updateTaskDescription({ id: props.id, description: debounceName }))
            queryClient.invalidateQueries({ queryKey: ['tasks', props.id] })
        }
    })

    useSkipFirstEffect(
        () => {
            mutate()
        }, [debounceName])

    const handleChange = (value: string) => {
        setName(value)
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

    return (
        <div>
            {isEditing ?
                <div ref={inputRef} >
                    <Editor
                        rollback={0}
                        apiKey="euoc7yhd8odjn7nrnt9ka85fdomhfmis21xby8swtj1j4p83"
                        initialValue={debounceName}
                        onEditorChange={handleChange}
                        init={{
                            height: 300,
                            menubar: false,
                            toolbar: 'bold italic underline strikethrough | bullist numlist',
                            plugins: 'lists',
                            content_style: `
                                body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }
                                ol, ul { margin: 0 0 1em 2em !important; }
                                li { margin: 0.2em 0, padding: 10px; }
                                strong { font-weight: bold; }
                                em { font-style: italic; }
                                u { text-decoration: underline; }
                                s { text-decoration: line-through; }
                                `
                        }}
                    />
                </div>
                : <div>
                    <div className="task-content" >Description:</div>
                    <span onClick={() => setIsEditing(true)} className="description">
                        {parse(props.description || '')}
                    </span>
                </div>
            }
            {!props.description && <div onClick={() => setIsEditing(true)}>Add description</div>}
        </div>
    )
}

export default TaskDescription