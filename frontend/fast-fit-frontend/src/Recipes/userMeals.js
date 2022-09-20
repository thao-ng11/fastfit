import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { useToken } from '../Authentication';
import MealResult from './mealResult';

function UserMeals() {
    const [token] = useToken()
    const navigate = useNavigate()
    const [meals, setMeals] = useState([])
    const appID = process.env.REACT_APP_EDAMAM_APP_ID
    const apiKey = process.env.REACT_APP_EDAMAM_RECIPE_API_KEY

    const fetchAPI = async (meal) => {
        let recipeId = meal['recipe_api_id']
        // console.log(recipeId)
        let apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${appID}&app_key=${apiKey}&field=label&field=image&field=images&field=yield&field=ingredientLines&field=calories&field=totalTime`
        
        const apiResponse = await fetch(apiUrl)
        
        if (apiResponse.ok) {
            const { recipe } = await apiResponse.json()
            // console.log(recipe)
            return recipe
            
            // console.log("api: ", meal)
        }
        // else {
        //     meal["recipe"] = "Could not load"
        //     // console.log(meal)
        //     setMeals([...meals, meal])
        // }
    }
    
    const fetchUserMeals = async () => {
        // console.log(token)
        // const tokenUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`
        // const tokenResponse = await fetch(tokenUrl, {credentials: "include",})
        // console.log(tokenResponse.status)
        // if (tokenResponse.status === 200) {
            // const { token } = await tokenResponse.json()

            const url = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/user`

            const mealsResponse = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (mealsResponse.ok) {
                const userMeals = await mealsResponse.json()
                // console.log(mealsArray)
                let mealArray = []
                for (let meal of userMeals) {
                    // console.log(meal)
                    // console.log(meals)
                    // setTimeout(async () => {
                        let recipe = await fetchAPI(meal)
                        meal["image"] = recipe.image
                        meal["label"] = recipe.label
                        meal["yield"] = recipe.yield
                        meal["calories"] = recipe.calories
                        meal["ingredientLines"] = recipe.ingredientLines
                        mealArray.push(meal)
                    //   }, [1000])
                    // console.log(mealArray)
                }
                // console.log("final meals: ", mealArray)
                setMeals(mealArray)
            }
        // }
        // else {
        //     navigate('/')
        // }
    }

    useEffect(() => {
        if (token !== null) {
            // console.log(token)
            fetchUserMeals()
        }
    }, [token])

    return (
        <div className="w-screen py-4">
            <div className="flex items-center justify-center">
                <div className="grid-col-row-2">
                    <div className="w-[1200px] bg-[#C7e8f3] shadow-xl rounded-lg">
                        <div className="grid-col-row-2">
                            <div className="px-6 py-4 rounded-lg shadow-xl">
                                <div className="grid-col-row-2 bg-[#f1f1f1] rounded-md">
                                    <h1 className="text-center font-semibold text-2xl py-4">My Meals</h1>
                                    <div className="flex flex-row gap-6 items-center justify-center py-2">
                                        <h2 className="">Search 
                                            <NavLink to="/meals/search" className="font-semibold text-[#8e4162]"> Recipes</NavLink> to add to your meals</h2>
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
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th className="w-[400px]">Recipe</th>
                                                <th>Meal Type</th>
                                                <th>Date</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                {meals.map(meal => {
                                                    // console.log("inside map", meal)
                                                    return (
                                                        <MealResult meal={meal} setMeals={setMeals} meals={meals} token={token}/>
                                                    );
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
    )
}

export default UserMeals