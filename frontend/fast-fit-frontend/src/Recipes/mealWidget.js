import React, { useEffect, useState } from 'react';
import { useToken } from '../Authentication';

function MealWidget() {
    const today = new Date()
    // const todayDate = today.toISOString()
    const todayYear = today.getFullYear()
    const todayDay = today.getDate()
    const todayMonth = (today.getMonth()+1).toString().padStart(2, '0')
    // console.log("month", todayMonth)
    // 2022-09-13
    const todayDate = `${todayYear}-${todayMonth}-${todayDay}`
    const todayTime = today.getHours()
    // console.log(today)
    // const todayTime = 8
    console.log("date", todayDate)
    // console.log(todayTime)

    const [mealType, setMealType] = useState('null')

    const [token] = useToken()
    const [meal, setMeal] = useState({
        recipe: '',
        image: ''
    })
    const [showSearch, setShowSearch] = useState(false)

    const appID = process.env.REACT_APP_EDAMAM_APP_ID
    const apiKey = process.env.REACT_APP_EDAMAM_RECIPE_API_KEY

    // console.log(token)
    // console.log(appID)
    // console.log(apiKey)

    const fetchRecipe = async (recipeId) => {
        const apiUrl = `https://api.edamam.com/api/recipes/v2/${recipeId}/?app_id=${appID}&type=public&app_key=${apiKey}&field=label&field=image`

        const apiResponse = await fetch(apiUrl)
         if (apiResponse.ok) {
            const { recipe } = await apiResponse.json()
            console.log(recipe)
            setMeal({
                ...meal,
                recipe: recipe.label,
                image: recipe.image
            })
         }
    }
    
    const fetchMeals = async () => {
        
        const url = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/user`

        try {
            const mealsResponse = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (mealsResponse.ok) {
                const meals = await mealsResponse.json()
                console.log(meals)
    
                const todayMeals = meals.filter(meal => meal['date'] === `${todayDate}` && meal['type'] === mealType)
                console.log(todayMeals)
                if (todayMeals.length > 0) {
    
                    const recipeID = todayMeals[0]['recipe_api_id']
                    console.log(recipeID)
        
                    fetchRecipe(recipeID)
                }
                else {
                    setShowSearch(true)
                }
            }
        } catch(error) {
            console.log("ERRORRRRRRRRRR", error)
        }

    }

    useEffect(() => {
        if (todayTime >= 14) {
            setMealType('Dinner')
        }
        else if (todayTime >= 10) {
            setMealType('Lunch')
        }
        else {setMealType('Breakfast')}
        console.log(mealType)
        
        if (token !== null) {
            fetchMeals()
        } 
    }, [token])
    
    return (
        <div className="flex items-center justify-center">
            <div className='grid-rows-3'>
                <h2 className="pt-3 font-semibold text-center">{mealType}: </h2>
                <h2 className='py-2 text-center'>{meal.recipe}</h2>
                <img className="w-[240px] rounded-lg shadow-md" src={meal.image} />
            </div>
        </div>
    )
}

export default MealWidget