import React, { useState } from 'react';
import { useToken } from '../Authentication';

function RecipeSearch(props) {
    const [token] = useToken()
    const [state, setState] = useState({
        query: '',
        meal_type: '',
    });
    
    const handleChange = event => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }
    
    const handleSubmit = async event => {
        event.preventDefault()
    }

    return (
        <div>
            <h1 className="text-center mt-4 mb-5">Search Recipes</h1>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit} id="create-meal-form">
                    <div className="form-floating mb-3">
                        <select onChange={handleChange} value = {state.meal_type} required name="meal_type" id="meal_type" className="form-select">
                            <option value="">Choose a meal type</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleChange} value = {state.query}placeholder="query" required type="text" name="query" id="query" className="form-control" />
                        <label htmlFor="name">Query</label>
                    </div>
                    <button className="btn btn-primary">Search</button>
                    </form>
                </div>  
            </div>
        </div>
    );
}

export default RecipeSearch;