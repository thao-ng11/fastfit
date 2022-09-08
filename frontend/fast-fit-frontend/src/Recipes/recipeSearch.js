import React, { useState } from 'react';
import { useToken } from '../Authentication';
import RecipeResult from './recipeResult';

function RecipeSearch(props) {
    const [token] = useToken()
    const [state, setState] = useState({
        query: '',
        type: '',
    });
    const [recipes, setRecipes] = useState([])
    
    const handleChange = event => {
        const value = event.target.value;
        setState({
            ...state,
            [event.target.name]: value
        })
    }
    
    const handleSearch = async event => {
        event.preventDefault()

        const searchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${state.query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_RECIPE_API_KEY}&mealType=${state.type}&imageSize=LARGE&imageSize=REGULAR&imageSize=SMALL&imageSize=THUMBNAIL&field=uri&field=label&field=image&field=calories`
        const response = await fetch(searchUrl)

        if (response.ok) {
            const data = await response.json()
            // console.log(data.hits)
            setRecipes(data.hits)
        }
    }

    return (
        <div>
            <h1 className="text-center mt-4 mb-5">Search Recipes</h1>
            <form onSubmit={handleSearch} id="create-meal-form">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <select onChange={handleChange} value = {state.type} required name="type" id="type" className="form-select">
                                    <option value="">Choose a meal type</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </select>
                            </td>
                            <td>
                                <input onChange={handleChange} value = {state.query}placeholder="Search query" required type="text" name="query" id="query" className="form-control" />
                            </td>
                            <td>
                                <button className="btn btn-primary">Search</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Recipe</th>
                            <th>Calories</th>
                            <th>Image</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipes.map(recipe => {
                            return (
                                <RecipeResult recipe = {recipe.recipe} />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecipeSearch;