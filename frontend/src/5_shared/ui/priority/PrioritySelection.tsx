import { useQuery } from "@tanstack/react-query";
import { fetchPrioritiesRequest } from "../../api/taskAPI";
import Select, { SingleValue, StylesConfig } from "react-select";
import { Priority } from "../../types";

interface PrioritySelectionProps {
    handlePriorityChoise?: (selectedPriority: Priority) => void
    handleSearchByPriority?: (id: number) => void
    selectedValue: number
    setSelectedValue: (priorityId: number) => void
    defaultValue?: Option
    width: string
}

export interface Option {
    value: number;
    label: string;
    color: string;
}

const PrioritySelection: React.FC<PrioritySelectionProps> = ({
    selectedValue,
    handlePriorityChoise,
    handleSearchByPriority,
    setSelectedValue,
    defaultValue,
    width
}) => {

    const { data } = useQuery({
        queryFn: () => fetchPrioritiesRequest(),
        queryKey: ['priorities']
    })

    const priorities = data?.data || []

    const options: Option[] = priorities ? priorities.map((item) => ({
        value: item.id, label: item.name, color: item.color
    })) : []

    if (defaultValue) {
        const index = options.findIndex((item) => item.value === 4);

        if (index !== -1) {
            options.splice(index, 1);
        }
        options.unshift(defaultValue);
    }

    const customStyles: StylesConfig<Option, false> = {
        option: (provided, state) => ({
            ...provided,
            color: 'white',
            backgroundColor: state.data.color,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color,
        }),
        menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
        }),
        control: (provided) => ({
            ...provided,
            width: width,
        }),
        menu: (provided) => ({
            ...provided,
            width: width,
        }),
    };

    const handlePriorityChange = (selectedOption: SingleValue<Option>) => {

        if (!selectedOption) return;

        const priorityId = selectedOption.value;
        setSelectedValue(priorityId);
        const selectedPriority = priorities.find((item) => item.id === priorityId);

        if (handleSearchByPriority) {
            handleSearchByPriority(priorityId)
        }
        if (selectedPriority && handlePriorityChoise) {
            handlePriorityChoise(selectedPriority)
        }
    };

    return (
        <Select
            options={options}
            name="priority"
            id="priority"
            value={options.find(option => option.value === selectedValue)}
            onChange={handlePriorityChange}
            styles={customStyles}
            defaultValue={defaultValue}
            menuPortalTarget={document.body}
        />
    )
}

export default PrioritySelection