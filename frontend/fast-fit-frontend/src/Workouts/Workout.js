import React, { useState,} from 'react';


function Workout(props) {
    // const [state, setState] = useState({

    // })
function setStyle(){
    if (props.selectedWorkout === props.id){
        return({color:"green",
                cursor:"pointer"})
    }else{
        return({color:"red",
                cursor:"pointer"})
    }
}
function setActive(){
    props.setSelectedWorkout(props.id)
}
return (
    <div style={setStyle()} onClick={setActive}>
        {props.name}
    </div>
)
}

export default Workout;