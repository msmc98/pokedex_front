import { types } from './../interfaces/types.js';
import './../static/css/types.css'

const Type = (props) => {

    const printDiv = () => {
        if(types[props.name]){
            return (
                <div className="type-element" 
                style={{
                    backgroundColor: `rgba(${types[props.name].rgb.r +','+ types[props.name].rgb.g +','+ types[props.name].rgb.b +', 0.2)'}`, 
                    border: `4px solid rgba(${types[props.name].rgb.r +','+ types[props.name].rgb.g +','+ types[props.name].rgb.b +', 0.7)' } `}} 
                key={props.index}>
                <img src={types[props.name].icon} style={{width: '35px'}} alt={types[props.name] }/>
            </div>
            )
        }
        return 'black'
    }


    return (
        printDiv()
    );
}


export default Type;