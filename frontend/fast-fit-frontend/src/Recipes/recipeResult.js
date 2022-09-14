import React, { useEffect, useState } from 'react';

function RecipeResult({recipe, type, token, noUser}) {
    // console.log(token)
    const [meal, setMeal] = useState({
        username: '',
        recipe_api_id: '',
        date: '',
        type: ''
    })
    
    const [successMessage, setSuccess] = useState('alert alert-success popup-message d-none')
    const [errorMessage, setError] = useState('alert alert-danger popup-message d-none')

    // console.log("original recipe", recipe)
    useEffect(() => {
        // console.log("recipe: change", recipe)
        setMeal({
            ...meal,
            recipe_api_id: recipe.uri.split('#')[1],
            type: type
        })
    }, [recipe])
    
    const handleChange = event => {
        const value = event.target.value;
        setMeal({...meal, date: value})
    }

    const handleSubmit = async event => {
        event.preventDefault()
        console.log(meal)
        const postUrl = `${process.env.REACT_APP_RECIPES_HOST}/api/meals`
        const response = await fetch(postUrl, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}` 
            },
            body: JSON.stringify(meal)
        })     // .then(function(response)
    //     {
    //     //  if(response.status!==200)
    //     //   {
    //     //      throw new Error(response.status)
    //     //   }
    //     })
    //    .catch(function(error)
    //    {
    //      ///if status code 401...
    //      console.log(error)
    //    });

        if (response.ok) {
            setSuccess('alert alert-success popup-message')
            setTimeout(() => {
                setSuccess('alert alert-success popup-message d-none')
            }, 3000)
        }    
        else {
            setError('alert alert-danger popup-message')
            setTimeout(() => {
                setError('alert alert-danger popup-message d-none')
            }, 3000)
        }
    }

    // console.log(recipe)
    return (
        <tr key={recipe.uri.split('#')[1]}>
            <td className="font-bold">{recipe.label}</td>
            <td>{Math.round(recipe.calories)}</td>
            <td><img src={recipe.image} /></td>
            <td className={noUser}>
                <div className="flex items-center justify-center">
                    <div className="grid-col-row-2">
                        <div className="grid-col-row-2">
                            <input 
                                onChange={handleChange}
                                placeholder="date" required type="date" name="date" id="date" 
                                className="form-control"/>
                        </div>
                        <div className="grid-col-row-2 mt-2">
                            <button onClick={handleSubmit} type="button" 
                                className="bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]">
                                    Add to Meals</button>
                        </div>
                        <div className="grid-col-row-2 mt-2">
                            <h2 className={successMessage}>Added to your meals!</h2>
                            <h2 className={errorMessage}>Select a date</h2>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default RecipeResult;