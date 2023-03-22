import React from 'react';
import './../static/css/spinner.css'

const PokeImg = (props) => {
    
    return (
        <div key={props.id}>
            {props.loading && 
                <div className="lds-spinner" style={{"paddingTop": "10px"}} >
                    {Array(12).fill(0).map((_, i) => <div key={i} />)}
                </div>}
            <img
                className="poke-img"
                style={{"marginBottom": "20px", maxWidth: "100px"}} 
                src={props.result?.sprites?.front_default ? props.result?.sprites?.front_default : props.result?.sprites?.other['official-artwork'].front_default} 
                alt={props.result?.name} 
                id={props.id}/>
        </div>
    )
}

export default PokeImg;