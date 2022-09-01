import React, { useState } from 'react';

function StrengthWorkoutForm() {
    const [state, setState] = useState({
        sets:'',
        repetitions:'',
        weight:'',
        
    });

    const handleSubmit = async event => {
        event.preventDefault();
        const data = state;

        const StrengthWorkoutUrl = 'http://localhost:8020/api/strength_workout'
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const response = await fetch(StrengthWorkoutUrl, fetchConfig);
        if (response.ok) {
            setState({
                sets:'',
                repetitions:'',
                weight:'',
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
            <h1>Add your Sets, Reps and Weight to your workout</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
                <input onChange={handleChange} value = {state.sets}placeholder="sets" required type="text" name="sets" id="sets" className="form-control" />
                <label htmlFor="name">Sets</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value = {state.reps}placeholder="repetitions" required type="text" name="repetitions" id="repetitions" className="form-control" />
                <label htmlFor="name">Reps</label>
            </div>
            <div className="form-floating mb-3">
                <input onChange={handleChange} value = {state.weight}placeholder="weight" required type="text" name="weight" id="weight" className="form-control" />
                <label htmlFor="name">Weight</label>
            </div>
            <button className="btn btn-primary">Create</button>
            </form>
        </div>  
        </div>
    </div>
    );
}

export default StrengthWorkoutForm;
