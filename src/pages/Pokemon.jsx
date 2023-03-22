
import useFetchData from '../hooks/useFetchData';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './../static/css/pokemon.css'
import { getAverageRGB } from './../utils/getAverageRGB';
import StatBar from '../components/StatBar';
import Type from '../components/Type';
import Footer from '../shared/Footer';
import back from './../static/imgs/back.svg';
import next from './../static/imgs/next.svg';
import { useNavigate } from 'react-router-dom';

const Pokemon = (props) => {
    const pokemon = useParams();
    const navigate = useNavigate();
    const [rgb, setRgb] = useState('rgba(160,160,160,0.3)')
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon.id}`;
    const { result, loading, error } = useFetchData(url);

    useEffect(() => {
        (async () => {
            if(result){
                const colors = await getAverageRGB(result.sprites.other['official-artwork'].front_default)
                return setRgb(`rgba(${colors.r}, ${colors.g}, ${colors.b}, 0.40)`)
            }
        })();
    }, [result])

    const handlePrevious = () => {
        return navigate(`/pokemon/${handle10000(pokemon.id)}`)
    }

    const handleNext = () => {
        return navigate(`/pokemon/${handle1010(pokemon.id)}`)
    }

    const handle1010 = (id) => {
        if(parseInt(id) === 1010){
            return 10001
        }
        return parseInt(id) + 1
    }

    const handle10000 = (id) =>{
        if(parseInt(id) === 10001){
            return 1010
        }
        return parseInt(id) - 1
    }

    return (
        <>
        <div className="main-container" key={props.id}>
        {error && <h1>{error}</h1>}
        {loading && <h1>Loading...</h1>}
        {result?.name && (
            <div key={props.id} className='general-layout'
                style={{backgroundColor: rgb,
                border: `4.6px solid ${rgb.replace('0.40','0.8')}`}}>
                <div className="right-layout">
                    <h1>{(result.name).charAt(0).toUpperCase() + result.name.slice(1)}</h1>
                    {/* <img src={result.sprites.front_default} alt={result.name} /> */}
                    <img 
                        src={result.sprites.other['official-artwork'].front_default} 
                        alt={result.name} 
                        style={{
                            filter: "drop-shadow(20px 10px 9px rgba(0, 0, 0, 0.9))",
                        }}/>

                    <h2>
                        {result.types.length > 1
                            ? <span key={props.id}>Types</span>
                            : <span key={props.id}>Type</span>}
                    </h2>
                    <div className="d-flex flex-row justify-content-center" style={{gap: "15px"}}>
                        {result.types.map((type, index) => (
                            <Type 
                                name={(type.type.name)} 
                                key={type.type.name + index} 
                                index={index} />
                        // <div>
                        //     <p key={type.type.name + index}>{type.type.name} 
                        //       {result.types.length-1 === index ? '' : <span>&nbsp;</span>}</p> 
                        // </div>
                        ))}
                    </div>
                    
                </div>
                <div className="left-layout">
                    <h2>Abilities</h2>
                    <div>
                        {result.abilities.map((ability, index) => (
                            <p key={ability.ability.name + index}>{ability.ability.name}</p>
                        ))}
                    </div>
                    <h2>Stats</h2>
                    <div className="d-flex justify-content-center flex-column flex-wrap" style={{width: '300px'}}>
                        {result.stats.map((stat, index) => (
                            <StatBar 
                                key={stat.stat.name + ' ' + index} 
                                stat={stat.stat.name} 
                                value={stat.base_stat} 
                                />
                            // <p key={stat.stat.name + index}>{stat.stat.name}: {stat.base_stat}</p>
                        ))}
                    </div>
                </div>
            </div>)}
        </div>
        <div className="nextBar">
                {
                    pokemon.id > 1 &&
                    <div className="nextButton" onClick={handlePrevious}>
                        <img src={back} alt="back" style={{display: 'inline'}}/>
                        <p style={{display: 'inline'}}>Anterior</p>
                    </div>
                }
                {
                    pokemon.id < 10271 &&
                    <div className="nextButton" onClick={handleNext}>
                    <p style={{display: 'inline'}}>Siguiente</p>
                    <img src={next} alt="next" />
                </div>
                }
            </div>
        <Footer />
        </>
    );
}

export default Pokemon;