export default function ToggleButton(props){
    return(
        <button 
            className="btn btn-secondary"
            onClick={props.onClick} 
            value={props.value} />
    );
}