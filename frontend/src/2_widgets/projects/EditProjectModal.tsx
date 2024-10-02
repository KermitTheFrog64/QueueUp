import { useMutation } from "@tanstack/react-query"
import { useAppDispatch } from "../../5_shared/hooks/redux"
import Input from "../../5_shared/ui/input/Input"
import { Modal } from "../../5_shared/ui/modal"
import { useDebounceValue } from "usehooks-ts"
import { updateProjectName } from "./projects-slice"
import { updateProjectNameRequest } from "../../5_shared/api/projectsAPI"
import useSkipFirstEffect from "../../5_shared/hooks/use-skip-first-use-effect"

interface EditProjectModalProps {
    id: number
    name: string
    setIsModalOpen: (b: boolean) => void
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({ id, name, setIsModalOpen }) => {

    const dispatch = useAppDispatch()

    const [debounceName, setName] = useDebounceValue<string>(name, 1000)

    const { mutate } = useMutation({
        mutationFn: () => updateProjectNameRequest(id, debounceName),
        onSuccess: () => {
            dispatch(updateProjectName({ id, name: debounceName }))
        }
    })

    useSkipFirstEffect(() => {
        mutate()
    }, [debounceName])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value
        setName(name)
    }

    return (
        <Modal name="Edit project's name" setIsModalOpen={setIsModalOpen} >
            <Input
                type="text"
                placeholder="Name"
                defaultValue={name}
                onChange={handleInputChange}
                required
            />
        </Modal>
    )
}

export default EditProjectModal 