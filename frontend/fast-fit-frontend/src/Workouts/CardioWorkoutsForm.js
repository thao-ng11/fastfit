import React, { useState } from 'react';

function CardioWorkoutForm() {
    const [state, setState] = useState({
        distance: '',
        duration:'',
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const data =  state;

        const CardioWorkoutUrl = 'http://localhost:8020/api/cardio_workout'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(CardioWorkoutUrl, fetchConfig);
        if (response.ok) {
            setState({
                distance:'',
                duration:'',
            });
        }
    }
    const handleChange = event => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }

return (
    <div className="row">
    <div className="offset-3 col-6">
    <div className="shadow p-4 mt-4">
        <h1>Add your duration and distance</h1>
        <form onSubmit={handleSubmit} id="create-customer-form">
        <div className="form-floating mb-3">
            <input onChange={handleChange} value = {state.distance}placeholder="distance" required type="text" name="distance" id="distance" className="form-control" />
            <label htmlFor="name">Distance</label>
        </div>
        <div className="form-floating mb-3">
            <input onChange={handleChange} value = {state.duration}placeholder="duration" required type="text" name="duration" id="duration" className="form-control" />
            <label htmlFor="name">Duration</label>
        </div>
        <button className="btn btn-primary">Create</button>
        </form>
    </div>  
    </div>
</div>
);
}

export default CardioWorkoutForm;
