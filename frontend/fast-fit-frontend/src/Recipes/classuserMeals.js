// not used - this is reference for original class version

import React from 'react';
import { AuthContext, useToken } from '../Authentication'
import { Navigate, NavLink } from 'react-router-dom'
import MealResult from './mealResult';

class UserMeals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meals: [],
            redirect: false,
            deleteConfirmation: 'grid-col-row-2 mt-2 d-none'
        };

    }
    static contextType = AuthContext;

    confirmDelete() {
        this.setState({deleteConfirmation: 'grid-col-row-2 mt-2'})
        setTimeout(() => {
            this.setState({deleteConfirmation: 'grid-col-row-2 mt-2 d-none'})
        }, 5000)
    }
    
    async componentDidMount() {
        const tokenUrl = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`
        const tokenResponse = await fetch(tokenUrl, {credentials: "include",})
        // console.log(tokenResponse.status)
        if (tokenResponse.status === 200) {
            const { token } = await tokenResponse.json()

            const url = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/user`
    
            const mealsResponse = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` },
            });
    
            if (mealsResponse.ok) {
                const meals = await mealsResponse.json()
                for (let meal of meals) {
                    // console.log(meal)
                    let recipe_id = meal['recipe_api_id']
                    // console.log(recipe_id)
                    let apiUrl = `https://api.edamam.com/api/recipes/v2/${recipe_id}/?app_id=${process.env.REACT_APP_EDAMAM_APP_ID}&type=public&app_key=${process.env.REACT_APP_EDAMAM_RECIPE_API_KEY}&field=label&field=image`
                    
                    const apiResponse = await fetch(apiUrl)
                    
                    if (apiResponse.ok) {
                        const { recipe } = await apiResponse.json()
                        // console.log(recipe)
                        meal["image"] = recipe.image
                        meal["recipe"] = recipe.label
                        // console.log(data)
                        this.setState({meals: meals})
                    }
                    else {
                        meal["recipe"] = "Could not load"
                        // console.log(meal)
                        this.setState({meals: meals})
                    }
                }
            };
        }
        else {
            this.setState({redirect: true})
        }
    }

    setMeals(id) {
        let refreshMeals = this.state.meals.filter(meal => meal.id !== id)
        this.setState({meals: refreshMeals})
    }

    async handleDelete(id) {
        const deleteUrl = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/${id}`

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            credentials: 'include',
        })

        if (response.ok) {
            this.setMeals(id)
        }
    }
    

    render(){
        if (this.state.redirect) {
            return (<Navigate to="/login" />)
        }

        // if (this.state.meals.length) {
        //     let recipeSearch = "d-none"
        // }
        // else {""}

        return (
            <div className="w-screen">
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
                                                    {this.state.meals.map(meal => {
                                                        // console.log(meal)
                                                        return (
                                                            // <MealResult meal={meal} handleDelete={this.handleDelete} />
                                                            <tr key={meal.id} >
                                                                <td>{meal.recipe}</td>
                                                                <td>{meal.type}</td>
                                                                <td>{meal.date}</td>
                                                                <td><img src={meal.image} /></td>
                                                                <td>
                                                                    <div className="flex items-center justify-center">
                                                                        <div className="grid-col-row-2">
                                                                            <div className="grid-col-row-2">
                                                                                <button onClick={() => this.confirmDelete} type="button" 
                                                                                    className="bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]">
                                                                                        Delete Meal</button>
                                                                            </div>
                                                                            <div className={this.state.deleteConfirmation}>
                                                                                <button onClick={() => this.handleDelete(meal.id)} type="button" 
                                                                                    className="bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]">
                                                                                        Confirm Delete</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
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
}

export default UserMeals