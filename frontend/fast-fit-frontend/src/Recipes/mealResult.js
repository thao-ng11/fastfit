import React, { useState } from 'react';

function MealResult({meal, setMeals, meals, token}) {

    const [deleteButton, setDeleteButton] = useState('grid-col-row-2')
    const [deleteConfirmation, setDeleteConfirmation] = useState('grid-col-row-2 mt-2 d-none')
    console.log("inside meal result: ", meal)
    // console.log(token)
    const confirmDelete = () => {
        setDeleteButton('grid-col-row-2 d-none')
        setDeleteConfirmation('grid-col-row-2 mt-2')
        // setTimeout(() => {
        //     setDeleteConfirmation('grid-col-row-2 mt-2 d-none')
        // }, 5000)
    }

    const refreshMeals = (id) => {
        let refreshMeals = meals.filter(meal => meal.id !== id)
        setMeals(refreshMeals)
    }
    
    const handleDelete = async id => {
        const deleteUrl = `${process.env.REACT_APP_RECIPES_HOST}/api/meals/${id}`

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                Authorization: `Bearer ${token}` 
            },
        })

        if (response.ok) {
            setDeleteConfirmation('grid-col-row-2 mt-2 d-none')
            setDeleteButton('grid-col-row-2')
            refreshMeals(id)
        }
    }

    return (
        <tr key={meal.id} >
            <td>{meal.recipe}</td>
            <td>{meal.type}</td>
            <td>{meal.date}</td>
            <td><img src={meal.image} /></td>
            <td>
                <div className="flex items-center justify-center">
                    <div className="grid-col-row-2">
                        <div className={deleteButton}>
                            <button onClick={confirmDelete} type="button" 
                                className="bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]">
                                    Delete Meal</button>
                        </div>
                        <div className={deleteConfirmation}>
                            <button onClick={() => handleDelete(meal.id)} type="button" 
                                className="bg-[#bf9aca] btn rounded font-bold text-[#f1f1f1]">
                                    Confirm Delete</button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default MealResult;