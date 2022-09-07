import React from 'react';
import { AuthContext, useToken } from '../Authentication'

class UserMeals extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            meals: [],
        };
    }
    static contextType = AuthContext;
    
    async componentDidMount() {
        
        const token_url = `${process.env.REACT_APP_ACCOUNTS_HOST}/token`
        const token_response = await fetch(token_url, {credentials: "include",})
        const { token } = await token_response.json()

        const url = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/user`

        const response = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
            const data = await response.json()
            for (let meal of data) {
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
                }
            }
            this.setState({meals: data})
        };
    }
    

    render(){
        return (
            <div>
                <h1 className="text-center">My Meals</h1>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Recipe</th>
                        <th>Meal Type</th>
                        <th>Date</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.meals.map(meal => {
                            return (
                                <tr key={meal.id} >
                                    <td>{meal.recipe}</td>
                                    <td>{meal.type}</td>
                                    <td>{meal.date}</td>
                                    <td><img src={meal.image} /></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default UserMeals