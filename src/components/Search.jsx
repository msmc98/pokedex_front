import { useSearch } from '../context/store'
import './../static/css/login.css';
import { useForm } from 'react-hook-form'

export const Search = () => {

    const setSearch = useSearch(state => state.setSearch)
    const { register, handleSubmit } = useForm()

    const onSubmit = (data) => setSearch((data.search).toLowerCase())

    return (
        <div className="pt-3">
            <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">Buscar</label>
            <input className="input" type="text" {...register('search', {required: true })} />
            </form>
        </div>
    )
}

