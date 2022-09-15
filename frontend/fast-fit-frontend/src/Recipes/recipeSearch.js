import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from '../Authentication';
import RecipeResult from './recipeResult';

function RecipeSearch() {
    const [token] = useToken()
    // console.log(token)
    const [query, setQuery] = useState('');
    const [mealType, setMealType] = useState('')
    const [recipes, setRecipes] = useState([])
    const [noUser, setNoUser] = useState('')
    const [loginMessage, setLoginMessage] = useState('d-none')
    
    
    const handleMealType = event => {
        const value = event.target.value;
        setMealType(value)
    }

    const handleQuery = event => {
        const value = event.target.value;
        setQuery(value)
    }
    
    const handleSearch = async event => {
        event.preventDefault()

        const searchUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&app_key=${process.env.REACT_APP_EDAMAM_RECIPE_API_KEY}&mealType=${mealType}&imageSize=LARGE&imageSize=REGULAR&imageSize=SMALL&imageSize=THUMBNAIL&field=uri&field=label&field=image&field=calories`
        const response = await fetch(searchUrl)

        if (response.ok) {
            const data = await response.json()
            // console.log(data.hits)
            setRecipes(data.hits)

            if (!token) {
                setNoUser('d-none')
                setLoginMessage('')
                // console.log('no token')
            }
        }
    }

    return (
        <div className="w-screen py-4">
            <div className="flex items-center justify-center">
                <div className="grid-col-row-2">
                    <div className="w-[1200px] bg-[#C7e8f3] shadow-xl rounded-lg">
                        <div className="grid-col-row-2">
                            <div className="px-6 py-4 rounded-lg shadow-xl">
                                <div className="grid-col-row-2 bg-[#f1f1f1] rounded-md">
                                    <h1 className="text-center font-semibold text-2xl py-3">Find Recipes</h1>
                                    <div className={loginMessage}>
                                        <h2 className="text-center py-1">
                                        <NavLink className="font-semibold text-[#8e4162]" to="/login">Log in</NavLink> to save a recipe to your meals</h2>
                                    </div>
                                    <div className="flex flex-row gap-6 items-center justify-center py-2">
                                        <form id="create-meal-form">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <select onChange={handleMealType} value={mealType} 
                                                                required name="type" id="type" className="form-select">
                                                                <option value="">Choose a meal type</option>
                                                                <option value="Breakfast">Breakfast</option>
                                                                <option value="Lunch">Lunch</option>
                                                                <option value="Dinner">Dinner</option>
                                                            </select>
                                                        </td>
                                                        <td>
                                                            <input onChange={handleQuery} value={query} 
                                                                placeholder="Search query" required type="text" 
                                                                name="query" id="query" className="form-control" />
                                                        </td>
                                                        <td>
                                                            <button type="button" onClick={handleSearch} 
                                                                className="bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]">Search</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[1200px] bg-[#C7e8f3] shadow-xl rounded-lg">
                        <div className="grid-col-row-2 mt-10">
                            <div className="px-6 py-4 rounded-lg shadow-xl">
                                <div className="grid-col-row-2 bg-[#f1f1f1] rounded-md">
                                    <div className="flex flex-row gap-6 items-center justify-center py-2">
                                        <table className='table'>
                                            <thead>
                                                <tr>
                                                    <th className="w-[400px]">Recipe</th>
                                                    <th>Calories</th>
                                                    <th></th>
                                                    <th className={noUser}>Plan Meal</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recipes.map(recipe => {
                                                    return (
                                                        <RecipeResult recipe = {recipe.recipe} type = {mealType} token = {token} noUser = {noUser}/>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecipeSearch;