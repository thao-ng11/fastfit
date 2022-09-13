import React, { useEffect, useState } from 'react';
import { useToken } from '../Authentication';

function MealWidget() {
    const todayDate = new Date().toISOString().split("T")[0]
    console.log(todayDate)

    const [token] = useToken()
    const [todayMeals, setTodayMeals] = useState([])

    console.log(token)

    const fetchMeals = async () => {
        const url = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/user`

        const mealsResponse = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        })

        if (mealsResponse.ok) {
            const meals = await mealsResponse.json()
            console.log(meals)
        }
    }

    useEffect(() => {
        fetchMeals()
    }, [token])
    
    return (
        undefined
    )
}

export default MealWidget