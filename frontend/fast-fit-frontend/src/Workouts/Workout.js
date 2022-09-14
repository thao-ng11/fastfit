import React, { useState,} from 'react';


function Workout(props) {
    console.log(props)
    // const [state, setState] = useState({

    // })
function setStyle(){
    console.log(props.strength)
    if (props.strength.workout === props.name){
        return({color:"black",
                cursor:"pointer"})
    }else{
        return({color:"white",
                cursor:"pointer"})
    }
}
function setActive(){
    props.handleStrength(false,{key:"workout",value:props.name})
    props.setState(false)
}
return (
    <div style={setStyle()} onClick={setActive}>
        {props.name}
    </div>
)
}

export default Workout;