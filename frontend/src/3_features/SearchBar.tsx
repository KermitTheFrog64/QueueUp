import './search.scss'
import Input from '../5_shared/ui/input/Input'
import SearchIcon from '../5_shared/search.svg'

interface SearchBarPayload extends React.InputHTMLAttributes<HTMLInputElement> {
    search: string
    setSearch: (e: any) => void
}

const SearchBar: React.FC<SearchBarPayload> = ({ search, setSearch }) => {

    const handleSearchChange = (event: any) => {
        setSearch(event.target.value)
    }

    return (
        <Input className='search-input'>
            <img src={SearchIcon} className="search-icon" />
            <input
                type="text"
                placeholder="Search by name..."
                value={search}
                onChange={handleSearchChange}
                className='search-bar'
            />
        </Input>
    )
}

export default SearchBar