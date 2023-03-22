//create react component
import React from 'react';
import useFetchData from '../hooks/useFetchData';
import { PokedexCmp } from '../components/PokedexCmp';
import './../static/css/pokedex.css'
import { useState, useEffect } from 'react';
import Footer from '../shared/Footer';
import { regions } from './../interfaces/regions';

const Regions = () => {
    let path = (window.location.pathname).split("/")[2];
    path = path.charAt(0).toUpperCase() + path.slice(1);
    const[limit, setLimit] = useState(0)
    const[offset, setoffset] = useState(0)

    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`; // 902 pokemons
    let { result, loading, error } = useFetchData(url);

    const handleRegion = () =>{
        const thisRegion = regions.find((region) => region.name === path)
        setLimit(thisRegion.limit)
        setoffset(thisRegion.offset)
    }

    useEffect(() => {
        handleRegion()
    })

    return (
        <div className="back">
            <div className="main-div" key="1">
                {error && <h1 key="error">{error}</h1>}
                {loading && <h1 key="loading">Loading...</h1>}
                {result?.results?.map((pokemon) => (
                    <PokedexCmp pokemon={pokemon} key={pokemon.name} />
                ))}
                
            </div>
            <Footer class='bot' margin={0} />
        </div>
    )
}

export default Regions;