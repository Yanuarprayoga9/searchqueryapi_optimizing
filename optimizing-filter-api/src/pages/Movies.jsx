import React, { useEffect, useState } from 'react'
import { UseDebounce } from '../../hooks/useDebounce'
import { FaMagnifyingGlass, FaRegStar } from "react-icons/fa6";
import SearchInput from '../components/SearchInput';
import MovieList from '../components/MovieList';
import SortMovie from '../components/SortMovie';
import PaginationMovies from '../components/PaginationMovies';
import PerPageMovies from '../components/PerPageMovies';
import { useLocation } from 'react-router-dom';

export const baseUrl = 'http://localhost:5000'
const Movies = () => {
    const [page,setPage] = useState(1)
    const [sort,setSort] = useState({ sort: 'year' , order: 'asc' })
    const [search, setSearch] = useState('')
    const [limit, setLimit] = useState(10)
    const debounced = UseDebounce(search)
    const [obj, setObj] = useState({});
    const {search:searchQuery,pathname} = useLocation()
    console.log()
    const getAllmovies = async () => {
        try {
            const url = `${baseUrl}/movies?search=${debounced || ''}&limit=${limit}&sort=${sort.sort},${sort.order}&page=${page}`
            console.log({url})
            const res = await fetch(url)
            const data = await res.json();
            console.log(data)
            setObj(data);

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        console.log()
        getAllmovies();
    }, [debounced,sort.sort,sort.order,page,limit])
    return (
        <div className='  w-full flex flex-col space-y-6 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Movies page</h1>
            <div className="w-full flex justify-around">

                <SortMovie sort={sort} setSort={setSort} />
                <PerPageMovies limit={limit} setLimit={setLimit}/>
                <SearchInput setSearch={setSearch} />
            </div>
            <MovieList movies={obj.movies} />
            <PaginationMovies page={page} setPage={setPage} limit={10} total={obj.total}/>
        </div>
    )
}

export default Movies