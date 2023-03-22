import { manageColor } from './../interfaces/stats';


const StatBar = (props) => {

    return (
        <div className="d-flex justify.content-center align-items-center flex-wrap">
            <div style={{display: 'inline-flex', width: '120px'}}>{props.stat}</div>
            <div className="progress" style={{height: '20px', width: '130px'}}>
                <div className="progress-bar" 
                role="progressbar" 
                style={{
                    width: `${props.value}%`, 
                    backgroundColor: `${manageColor(props.value)}`,
                    }} 
                aria-valuenow={props.value} 
                aria-valuemin="0" 
                aria-valuemax="200"></div>
            </div>

            <div style={{display: 'inline', width: '40px'}}>{props.value}</div>
            
        </div>
    );
};

export default StatBar;