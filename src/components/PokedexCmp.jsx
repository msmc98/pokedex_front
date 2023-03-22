
import PokeImg from '../components/PokeImg';
import { Link } from "react-router-dom";
import './../static/css/pokedexCmp.css'
import { getAverageRGB } from '../utils/getAverageRGB';
import { useState, useMemo, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';

export const PokedexCmp = (props) =>{
    // console.log(props)
    const fetch = useFetchData(props.pokemon.url);
    const memoFetch = useMemo(() => fetch, [fetch])
    const [rgb, setRgb] = useState('rgba(160,160,160,0.3)')

    useEffect(() => {
        (async () => {
            if(memoFetch.result){
                let pic = memoFetch.result?.sprites?.front_default ? memoFetch.result?.sprites?.front_default : memoFetch.result?.sprites?.other['official-artwork'].front_default
                const colors = await getAverageRGB(pic)
                return setRgb(`rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.90)`)
            }
        })();
    }, [memoFetch.result])


    return (
        <div
            className="card"
            key={props.pokemon.name}
            style={{
                backgroundImage: `linear-gradient(to bottom, #fff 44%, ${ rgb }),
                url(${memoFetch.result?.sprites?.front_default}`, 
                border: `5px solid ${rgb.replace('0.5','0.95')}`}} >
            <Link key={props.pokemon.id} to={`/pokemon/${props.pokemon.url.split('/')[6]}`}>
                <div key={props.pokemon.id} className="">
                    <h3 key={props.pokemon.id}>
                        {(props.pokemon.name).charAt(0).toUpperCase() + props.pokemon.name.slice(1)}
                    </h3>
                    <PokeImg
                        key={props.pokemon.url.split('/')[6]}
                        name={props.pokemon.name}
                        result={memoFetch.result}
                        loading={memoFetch.loading}/>
                </div>
            </Link>
        </div>
    )
}


/*import PokeImg from '../components/PokeImg';
import { Link } from "react-router-dom";
import './../css/pokedexCmp.css'
import { getAverageRGB } from '../utils/getAverageRGB';
import { useState } from 'react';
import useFetchData from '../hooks/useFetchData';

export const PokedexCmp = (props) =>{
    const [rgb, setRgb] = useState('rgba(0,0,0,0.5)')

    const { result, loading } = useFetchData(props.pokemon.url);

    (async () => {
        let print = await fetch(props.pokemon.url)
        print = await print.json()
        const colors = getAverageRGB(print.sprites.front_default)
        return setRgb(`rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.5)`)
    }
    )();

    return (
        <div
            className="card"
            key={props.pokemon.name}
            style={{
                // backgroundImage: `url(${result?.sprites?.front_default}`,
            backgroundImage: `linear-gradient(to bottom, #fff 44%, ${ rgb }), url(${result?.sprites?.front_default}`}}>
            <Link key={props.pokemon.id} to={`/pokemon/${props.pokemon.name}`}>
                <div key={props.pokemon.id} className="">
                    <h1 key={props.pokemon.id}>{(props.pokemon.name).charAt(0).toUpperCase() + props.pokemon.name.slice(1)}</h1>
                    <PokeImg
                        key={props.pokemon.url.split('/')[6]}
                        name={props.pokemon.name}
                        result={result}
                        loading={loading}
                        />
                </div>
            </Link>
        </div>
    )
} */