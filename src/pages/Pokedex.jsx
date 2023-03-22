//create react component
import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { PokedexCmp } from '../components/PokedexCmp';
import './../static/css/pokedex.css'
import { useState } from 'react';
import Footer from './../shared/Footer';
import { useMemo } from 'react';
import next from './../static/imgs/next.svg'
import back from './../static/imgs/back.svg'
import { useSearch } from '../context/store'
import { Search } from './../components/Search';
import { useEffect } from 'react';

const Pokedex = () => {
    const[limit, setLimit] = useState(20)
    const[offset, setOffset] = useState(0)
    const[page, setPage] = useState(0)
    const[searching, setSearching] = useState(null)
    const search = useSearch(state => state.search)
    
    const url = `https://pokeapi.co/api/v2/pokemon` + (search ? `/${search}` : `?limit=${limit}&offset=${offset}`);

    const fetching = useFetchData(url);
    const memoFetch = useMemo(() => fetching, [fetching])

    const handleShowMore = () => {
        setLimit(limit + 20);
    }

    const handlePrevious = () =>{
        setPage(page - 1)
        changeOffset(page - 1)
    }

    const handleNext = () => {
        setPage(page + 1)
        changeOffset(page + 1)
    }

    const changeOffset = (page) => {
        setOffset(limit * page)
    }

    const handleReset = () => {
        window.location.reload();
    }

    useEffect(() => {
        if(search){
            setSearching(search)
        }
    }, [search]);
    

    return (
        <div className={!searching ? "back" : "back-searching"}>
            <Search />
            <div className="main-div" key="1">
                {memoFetch.error && <h1 key="error">{memoFetch.error}</h1>}
                {memoFetch.loading && <h1 key="loading">Loading...</h1>}
                {!searching && memoFetch?.result?.results?.map((pokemon) => (
                    <PokedexCmp pokemon={pokemon} key={pokemon.name} />
                ))}
                {searching && memoFetch?.result?.species && <PokedexCmp 
                pokemon={{name: memoFetch.result.species.name, url: memoFetch.result.species.url.replace('-species', '')}} 
                key={memoFetch.result.species.name} />
                }
                
            </div>
            {searching && <button className="btn btn-dark" onClick={handleReset}>Reset</button>}
            {!searching && <button className="btn btn-dark" onClick={handleShowMore}>Mostrar más</button>}
            {!searching && <div className="nextBar">
                {
                    page > 0 &&
                    <div className="nextButton" onClick={handlePrevious}>
                        <img src={back} alt="back" style={{display: 'inline'}}/>
                        <p style={{display: 'inline'}}>Anterior</p>
                    </div>
                }
                <div>
                    <p>Página {page + 1}</p>
                </div>
                {
                    memoFetch?.result?.results?.length === limit &&
                    <div className="nextButton" onClick={handleNext}>
                    <p style={{display: 'inline'}}>Siguiente</p>
                    <img src={next} alt="next" />
                </div>
                }
            </div>}
            <Footer class={searching ? 'forced' : ''}/>
        </div>
    )
}

export default Pokedex;